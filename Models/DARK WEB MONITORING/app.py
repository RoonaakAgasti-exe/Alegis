import streamlit as st
import time
from xposedornot import XposedOrNot


st.set_page_config(page_title="Alegis: Dark Web Security Monitor", layout="wide")


st.markdown("""
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Poppins:wght@300;400;600&display=swap');
    .stApp { background: radial-gradient(circle at center, #0a0e17 0%, #02040a 100%); }
    h1 { font-family: 'Orbitron', sans-serif; color: #00f2ff; text-shadow: 0 0 15px rgba(0, 242, 255, 0.6); text-align: center; }
    
    /* Input & Button Styling */
    .stTextInput > div > div > input { background: rgba(255, 255, 255, 0.05) !important; color: white !important; border-radius: 12px !important; }
    div.stButton > button { width: 100%; background: linear-gradient(90deg, #00f2ff, #0066ff); font-family: 'Orbitron'; border-radius: 12px; transition: 0.3s; }
    div.stButton > button:hover { transform: scale(1.02); box-shadow: 0 0 20px #00f2ff; }

    /* Result Cards */
    .safe-card { background: rgba(0, 255, 127, 0.1); border: 2px solid #00ff7f; padding: 30px; border-radius: 20px; text-align: center; }
    .unsafe-card { background: rgba(255, 49, 49, 0.15); border: 2px solid #ff3131; padding: 30px; border-radius: 20px; text-align: center; color: #ff3131; }
    </style>
""", unsafe_allow_html=True)

st.markdown("<h1>Alegis: Dark Web Security Monitor</h1>", unsafe_allow_html=True)


col1, col2, col3 = st.columns([1, 2, 1])
with col2:
    email_input = st.text_input("Target Email Endpoint", placeholder="Enter email...", label_visibility="collapsed")
    
    audit_clicked = st.button("RUN SECURITY AUDIT")


if audit_clicked:
    if email_input:
        
        progress_bar = st.progress(0)
        status_text = st.empty()
        for p in range(100):
            time.sleep(0.005)
            progress_bar.progress(p + 1)
            status_text.markdown(f"<p style='text-align:center; color:#00f2ff;'>Scanning Layer {p//10}...</p>", unsafe_allow_html=True)
        progress_bar.empty()
        status_text.empty()

        try:
            xon = XposedOrNot()
            result = xon.check_email(email_input)

            
            
            is_actually_breached = False
            
            if result:
                
                if hasattr(result, 'breaches') and len(result.breaches) > 0:
                    is_actually_breached = True
                
                elif isinstance(result, dict) and len(result.get('breaches', [[]])[0]) > 0:
                    is_actually_breached = True
            
            if is_actually_breached:
                
                st.markdown(f"""
                    <div class="unsafe-card">
                        <h2 style="font-size: 40px;">⚠ WARNING</h2>
                        <h3>SECURITY BREACH DETECTED</h3>
                        <p style="font-family:Poppins;">Credentials for {email_input} have been exposed.</p>
                    </div>
                """, unsafe_allow_html=True)
                
                with st.expander("VIEW BREACH ANALYTICS"):
                    
                    st.json({"status": "Exposed", "details": str(result)})
            
            else:
                
                st.markdown(f"""
                    <div class="safe-card">
                        <h2 style="font-size: 50px;">🛡️</h2>
                        <h3>✔ YOU ARE SAFE</h3>
                        <p style="font-family:Poppins;">No exposures found for {email_input}. Your data is secure.</p>
                    </div>
                """, unsafe_allow_html=True)
            

        except Exception as e:
            if "404" in str(e):
                st.markdown(f"""<div class="safe-card"><h3>🛡️ ✔ YOU ARE SAFE</h3><p>Email not found in databases.</p></div>""", unsafe_allow_html=True)
            else:
                st.error(f"Alegis System Error: {e}")
    else:
        st.warning("Please enter an email address first.")
