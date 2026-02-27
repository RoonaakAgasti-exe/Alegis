import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc, collection, query, limit, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { setLogLevel } from 'firebase/firestore';


setLogLevel('debug');




const firebaseConfig = JSON.parse(typeof __firebase_config !== 'undefined' ? __firebase_config : '{}');

const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';


const app = Object.keys(firebaseConfig).length > 0 ? initializeApp(firebaseConfig) : null;
const db = app ? getFirestore(app) : null;
const auth = app ? getAuth(app) : null;


const MOCK_USER = {
  id: 'user_12345',
  name: 'Alex Johnson',
  email: 'alex.j@example.com',
  monthlyLimit: 5000,
  averageTransaction: 150,
  location: 'New York, US',
  ip: '108.7.2.19',
};


const categories = [
  'Groceries', 'Online Shopping', 'Travel', 'Subscription', 'Gambling',
  'International', 'Electronics', 'Retail', 'Cash Withdrawal', 'Investment'
];


const calculateRiskScore = (transaction, history) => {
  let score = 0;
  const { amount, category, location, isNewMerchant, timeOfDay, consecutiveAttempts, unusualPattern } = transaction;

  
  if (amount > 1000) score += 20;
  
  if (['Gambling', 'International', 'Investment'].includes(category)) score += 25;
  
  if (timeOfDay === 'night' || timeOfDay === 'early_morning') score += 15;
  
  if (consecutiveAttempts > 0) score += (consecutiveAttempts * 10);
  
  if (isNewMerchant || location.includes('Remote')) score += 10;
  
  if (unusualPattern) score += 20;

  
  if (amount > MOCK_USER.averageTransaction * 3) score += 10;

  
  return Math.min(score, 100);
};


const getRiskColor = (score) => {
  if (score >= 70) return 'text-red-600 bg-red-100 border-red-300';
  if (score >= 40) return 'text-yellow-600 bg-yellow-100 border-yellow-300';
  return 'text-green-600 bg-green-100 border-green-300';
};


const getRiskBadge = (score) => {
  if (score >= 70) return 'High Risk';
  if (score >= 40) return 'Moderate Risk';
  return 'Low Risk';
};




const UserProfileCard = ({ user, isAuthReady, userId }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
    <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      User Profile
    </h2>
    <div className="space-y-2 text-sm text-gray-600">
      <p className="flex justify-between">
        <span className="font-medium text-gray-700">Name:</span> <span>{user.name}</span>
      </p>
      <p className="flex justify-between">
        <span className="font-medium text-gray-700">Location:</span> <span>{user.location}</span>
      </p>
      <p className="flex justify-between">
        <span className="font-medium text-gray-700">IP Address:</span> <span>{user.ip}</span>
      </p>
      <p className="flex justify-between pt-2 border-t border-gray-100">
        <span className="font-medium text-gray-700">Monthly Limit:</span> <span className="text-indigo-600 font-semibold">${user.monthlyLimit.toLocaleString()}</span>
      </p>
      <p className="text-xs text-gray-400 mt-4 break-all">
        {}
        {isAuthReady 
          ? (userId ? `Firebase User ID: ${userId}` : 'Status: Unauthenticated (Data read/write is restricted)') 
          : 'Authenticating...'}
      </p>
    </div>
  </div>
);


const AnalysisDisplay = ({ transaction, riskScore, riskColor, riskBadge }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 h-full flex flex-col justify-center items-center">
    <div className={`w-32 h-32 rounded-full flex items-center justify-center border-4 ${riskColor.replace(/text-.* /, 'border-')} mb-4 transition-all duration-500`}>
      <span className="text-4xl font-extrabold text-gray-800">{riskScore}</span>
    </div>
    <div className={`px-4 py-1 rounded-full text-sm font-semibold ${riskColor} border transition-all duration-500`}>
      {riskBadge}
    </div>
    <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">Fraud Risk Score</h3>
    <p className="text-center text-sm text-gray-500">
      The score is calculated based on transaction velocity, location, category, and historical patterns.
    </p>

    {transaction && (
      <div className="mt-4 w-full max-w-sm">
        <div className="flex justify-between text-xs text-gray-600">
          <span className="font-semibold">Anomaly Flags:</span>
        </div>
        <ul className="list-disc list-inside text-xs text-gray-500 mt-2 space-y-1">
          {transaction.amount > 1000 && <li>High transaction amount ({'>'}$1000)</li>}
          {['Gambling', 'International', 'Investment'].includes(transaction.category) && <li>High-risk category: {transaction.category}</li>}
          {(transaction.timeOfDay === 'night' || transaction.timeOfDay === 'early_morning') && <li>Off-peak hours ({transaction.timeOfDay.replace('_', ' ')})</li>}
          {transaction.consecutiveAttempts > 0 && <li>Repeated attempts ({transaction.consecutiveAttempts} failed)</li>}
          {transaction.isNewMerchant && <li>First time merchant/location</li>}
          {transaction.unusualPattern && <li>Unusual spending pattern detected</li>}
          {transaction.amount > MOCK_USER.averageTransaction * 3 && <li>Amount 3x average spending</li>}
          {riskScore < 40 && <li>No significant anomalies detected.</li>}
        </ul>
      </div>
    )}
  </div>
);


const TransactionForm = ({ onSubmit, categories, isLoading }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [location, setLocation] = useState('New York, US');
  const [isNewMerchant, setIsNewMerchant] = useState(false);
  const [timeOfDay, setTimeOfDay] = useState('day');
  const [consecutiveAttempts, setConsecutiveAttempts] = useState(0);
  const [unusualPattern, setUnusualPattern] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || isNaN(parseFloat(amount))) {
      return; 
    }

    const transaction = {
      amount: parseFloat(amount),
      category,
      location,
      isNewMerchant,
      timeOfDay,
      consecutiveAttempts,
      unusualPattern,
    };
    onSubmit(transaction);
    
    setAmount('');
    setIsNewMerchant(false);
    setConsecutiveAttempts(0);
    setUnusualPattern(false);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V9m0 3v1m0 3v1" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12v2H3V5zm0 4h12v2H3V9zm0 4h8v2H3v-2z" />
        </svg>
        Simulate Transaction
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount ($)</label>
          <input
            id="amount"
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="e.g., 150.00 or 1250.00"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
            <select
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="New York, US">New York, US (Normal)</option>
              <option value="Tokyo, JP">Tokyo, JP (International)</option>
              <option value="Remote IP">Remote IP (Suspicious)</option>
            </select>
          </div>
          <div>
            <label htmlFor="timeOfDay" className="block text-sm font-medium text-gray-700">Time of Day</label>
            <select
              id="timeOfDay"
              value={timeOfDay}
              onChange={(e) => setTimeOfDay(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="day">Day (8 AM - 7 PM)</option>
              <option value="night">Night (7 PM - 1 AM)</option>
              <option value="early_morning">Early Morning (1 AM - 8 AM)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <input
              id="newMerchant"
              type="checkbox"
              checked={isNewMerchant}
              onChange={(e) => setIsNewMerchant(e.target.checked)}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label htmlFor="newMerchant" className="ml-2 block text-sm text-gray-700">New Merchant/Location</label>
          </div>
          <div className="flex items-center">
            <input
              id="unusualPattern"
              type="checkbox"
              checked={unusualPattern}
              onChange={(e) => setUnusualPattern(e.target.checked)}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label htmlFor="unusualPattern" className="ml-2 block text-sm text-gray-700">Unusual Pattern/Velocity</label>
          </div>
        </div>

        <div>
          <label htmlFor="attempts" className="block text-sm font-medium text-gray-700">Consecutive Failed Attempts</label>
          <input
            id="attempts"
            type="number"
            min="0"
            value={consecutiveAttempts}
            onChange={(e) => setConsecutiveAttempts(Math.max(0, parseInt(e.target.value) || 0))}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>


        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white transition-colors ${
            isLoading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          }`}
        >
          {isLoading ? 'Analyzing...' : 'Analyze Transaction'}
        </button>
      </form>
    </div>
  );
};


const TransactionHistory = ({ history }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
    <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      Transaction History (Last 5)
    </h2>
    <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
      {history.length === 0 ? (
        <p className="text-gray-500 text-sm italic">No transactions simulated yet.</p>
      ) : (
        history.map((tx, index) => (
          <div key={index} className="flex justify-between items-center p-3 rounded-lg border border-gray-200">
            <div>
              <p className="text-gray-900 font-semibold">${tx.amount.toFixed(2)}</p>
              <p className="text-xs text-gray-500">{tx.category} - {tx.location}</p>
            </div>
            <div className={`px-3 py-1 text-xs font-medium rounded-full ${getRiskColor(tx.riskScore)} border`}>
              {tx.riskScore} ({getRiskBadge(tx.riskScore)})
            </div>
          </div>
        ))
      )}
    </div>
  </div>
);


const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [latestTransaction, setLatestTransaction] = useState(null);
  const [riskScore, setRiskScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [userId, setUserId] = useState(null);
  const [dbInstance, setDbInstance] = useState(null);

  
  useEffect(() => {
    if (!app || !db || !auth) {
      console.error("Firebase is not initialized. Check __firebase_config.");
      setIsAuthReady(true);
      return;
    }

    const initAuth = async () => {
      try {
        if (initialAuthToken) {
          await signInWithCustomToken(auth, initialAuthToken);
        } else {
          await signInAnonymously(auth);
        }
      } catch (error) {
        console.error("Firebase Authentication failed:", error);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null); 
        console.warn("User is not authenticated. Firestore read/write permissions for private data might fail.");
      }
      setIsAuthReady(true);
      setDbInstance(db); 
    });

    initAuth();
    return () => unsubscribe();
  }, []); 

  
  useEffect(() => {
    if (!isAuthReady || !dbInstance || !userId) {
        if (isAuthReady) {
            console.log("Firestore listener skipped: Waiting for authentication (or user is unauthenticated).");
            setTransactions([]); 
        }
        return;
    }

    
    
    const txCollectionRef = collection(dbInstance, `artifacts/${appId}/users/${userId}/transactions`);
    
    const q = query(txCollectionRef, limit(5));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const history = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        history.push({
          id: doc.id,
          ...data,
          
          timestamp: data.timestamp?.toDate ? data.timestamp.toDate() : new Date(),
          amount: parseFloat(data.amount || 0),
        });
      });
      
      setTransactions(history.reverse());
    }, (error) => {
      console.error("Error fetching transactions:", error);
    });

    return () => unsubscribe();
  }, [isAuthReady, dbInstance, userId]); 

  
  const handleSimulateTransaction = useCallback(async (transactionData) => {
    setIsLoading(true);
    setLatestTransaction(null); 

    
    const calculatedScore = calculateRiskScore(transactionData, transactions);

    
    const newTransaction = {
      ...transactionData,
      riskScore: calculatedScore,
      timestamp: serverTimestamp(),
      amount: transactionData.amount.toFixed(2), 
    };

    setLatestTransaction(newTransaction);
    setRiskScore(calculatedScore);

    
    if (dbInstance && userId) {
      try {
        const txCollectionRef = collection(dbInstance, `artifacts/${appId}/users/${userId}/transactions`);
        
        const newDocRef = doc(txCollectionRef);
        await setDoc(newDocRef, newTransaction);
        
        console.log("Transaction saved successfully with ID:", newDocRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    } else {
      console.warn("Firestore not ready or user is unauthenticated. Transaction not saved.");
      
      setTransactions(prev => [{ ...newTransaction, timestamp: new Date() }].concat(prev).slice(0, 5));
    }

    setIsLoading(false);
  }, [transactions, dbInstance, userId]);

  
  const riskColor = useMemo(() => getRiskColor(riskScore), [riskScore]);
  const riskBadge = useMemo(() => getRiskBadge(riskScore), [riskScore]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 font-sans">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.047A12.007 12.007 0 002.944 12c.002 2.903.921 5.61 2.532 7.846A12.008 12.008 0 0012 21.056c2.903-.002 5.61-.921 7.846-2.532A12.007 12.007 0 0021.056 12a12.007 12.007 0 00-3.047-8.618z" />
          </svg>
          Fraud Detection Simulator
        </h1>
        <p className="text-lg text-gray-500 mt-2">Simulate a financial transaction and see its real-time fraud risk score.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {}
        <div className="lg:col-span-1">
          <TransactionForm
            onSubmit={handleSimulateTransaction}
            categories={categories}
            isLoading={isLoading}
          />
        </div>

        {}
        <div className="lg:col-span-1 space-y-6">
          <AnalysisDisplay
            transaction={latestTransaction}
            riskScore={riskScore}
            riskColor={riskColor}
            riskBadge={riskBadge}
          />
          <UserProfileCard user={MOCK_USER} isAuthReady={isAuthReady} userId={userId} />
        </div>

        {}
        <div className="lg:col-span-1">
          <TransactionHistory history={transactions} />
        </div>
      </div>

      <footer className="text-center mt-12 text-sm text-gray-400">
        This is a simulation using pre-defined risk rules and Firebase for state persistence.
      </footer>
    </div>
  );
};

export default App;