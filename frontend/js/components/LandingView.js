export const LandingView = () => `
    <section class="hero">
        <div class="container hero-container">
            <div class="hero-content">
                <h1 class="tagline">Smart Farming Guidance at Your Fingertips</h1>
                <p class="hero-subtitle">Kisan_Setu AI uses advanced technology to help you grow more, save more, and farm smarter.</p>
                <div class="hero-actions">
                    <button class="btn btn-primary" onclick="navigateTo('chat')">Ask Your Question</button>
                    <button class="btn btn-outline" onclick="navigateTo('dashboard')">View Dashboard</button>
                </div>
            </div>
            <div class="hero-image">
                <div class="image-blob" style="width: 400px; height: 400px; background: var(--accent); border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; opacity: 0.2; position: absolute;"></div>
                <div class="mockup-screen" style="width: 300px; height: 500px; background: #fff; border-radius: 40px; border: 8px solid #333; box-shadow: 0 50px 100px rgba(0,0,0,0.2); overflow: hidden; position: relative; z-index: 2;">
                    <div style="background: var(--primary); height: 60px; display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 600;">Kisan_Setu AI</div>
                    <div style="padding: 20px;">
                        <div style="background: #f0f0f0; padding: 10px; border-radius: 10px; margin-bottom: 10px; width: 80%;">How is the weather today?</div>
                        <div style="background: var(--primary-light); color: #fff; padding: 10px; border-radius: 10px; margin-bottom: 10px; width: 80%; align-self: flex-end; margin-left: 20%;">The weather is clear and perfect for harvesting.</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="features">
        <div class="container">
            <h2 class="section-title">Everything a Farmer Needs</h2>
            <div class="feature-grid">
                <div class="feature-card">
                    <div class="feature-icon"><i data-lucide="mic"></i></div>
                    <h3>Voice Support</h3>
                    <p>Speak in your language. We support English, Hindi, and Bhojpuri.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon"><i data-lucide="cloud-sun"></i></div>
                    <h3>Weather Alerts</h3>
                    <p>Get real-time weather updates and alerts for your specific location.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon"><i data-lucide="trending-up"></i></div>
                    <h3>Market Prices</h3>
                    <p>Track latest crop prices from Mandis near you to get the best deal.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon"><i data-lucide="leaf"></i></div>
                    <h3>Crop Health</h3>
                    <p>AI-powered advice on fertilizers, pests, and disease management.</p>
                </div>
            </div>
        </div>
    </section>
`;
