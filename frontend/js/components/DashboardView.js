export const DashboardView = () => `
    <div class="container">
        <h2 style="margin: 30px 0; font-size: 2rem; color: var(--primary-dark);">Farmer's Dashboard</h2>
        
        <div class="dashboard-grid">
            <div class="dashboard-main">
                <div class="dashboard-card weather-card" style="margin-bottom: 30px;">
                    <div>
                        <h3 style="font-size: 1.5rem; margin-bottom: 5px;">Today's Weather</h3>
                        <p style="opacity: 0.9;">Varanasi, Uttar Pradesh</p>
                        <div style="font-size: 3rem; font-weight: 700; margin: 20px 0;">32°C</div>
                        <p>Sunny with light winds. Great for drying grains.</p>
                    </div>
                    <div style="font-size: 5rem;">
                        <i data-lucide="sun"></i>
                    </div>
                </div>
                
                <div class="dashboard-card">
                    <h3 style="margin-bottom: 20px; display: flex; align-items: center; gap: 10px;">
                        <i data-lucide="shopping-basket" style="color: var(--primary);"></i>
                        Current Market Prices (Mandi)
                    </h3>
                    <table style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr style="text-align: left; border-bottom: 1px solid #eee;">
                                <th style="padding: 10px;">Crop</th>
                                <th style="padding: 10px;">Price (per Q)</th>
                                <th style="padding: 10px;">Trend</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style="border-bottom: 1px solid #f9f9f9;">
                                <td style="padding: 15px 10px;">Wheat (Gehu)</td>
                                <td style="padding: 15px 10px;">₹2,275</td>
                                <td style="padding: 15px 10px; color: var(--success);"><i data-lucide="trending-up" style="width: 16px;"></i> +2%</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #f9f9f9;">
                                <td style="padding: 15px 10px;">Rice (Paddy)</td>
                                <td style="padding: 15px 10px;">₹2,183</td>
                                <td style="padding: 15px 10px; color: var(--error);"><i data-lucide="trending-down" style="width: 16px;"></i> -1%</td>
                            </tr>
                            <tr>
                                <td style="padding: 15px 10px;">Mustard (Sarson)</td>
                                <td style="padding: 15px 10px;">₹5,450</td>
                                <td style="padding: 15px 10px; color: var(--success);"><i data-lucide="trending-up" style="width: 16px;"></i> +0.5%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div class="dashboard-sidebar">
                <div class="dashboard-card" style="margin-bottom: 30px;">
                    <h3 style="margin-bottom: 15px; font-size: 1.1rem;">Quick Actions</h3>
                    <div style="display: flex; flex-direction: column; gap: 10px;">
                        <button class="btn btn-outline" style="text-align: left;" onclick="navigateTo('chat')">
                            <i data-lucide="message-square" style="width: 16px; margin-right: 10px;"></i>
                            Ask about Disease
                        </button>
                        <button class="btn btn-outline" style="text-align: left;">
                            <i data-lucide="file-text" style="width: 16px; margin-right: 10px;"></i>
                            Govt Schemes
                        </button>
                        <button class="btn btn-outline" style="text-align: left;">
                            <i data-lucide="calculator" style="width: 16px; margin-right: 10px;"></i>
                            Fertilizer Calculator
                        </button>
                    </div>
                </div>
                
                <div class="dashboard-card" style="background: #fff8e1; border: 1px solid #ffe082;">
                    <h3 style="margin-bottom: 10px; color: #f57c00;">Pro Tip</h3>
                    <p style="font-size: 0.9rem;">Crop rotation with legumes can improve soil nitrogen levels by up to 20%. Ask me for more details!</p>
                </div>
            </div>
        </div>
    </div>
`;
