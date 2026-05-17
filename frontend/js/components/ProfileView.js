export const ProfileView = () => `
    <section class="profile-section">
        <div class="container">
            <div class="profile-grid">
                <div class="profile-card profile-form-card">
                    <div class="profile-card-header">
                        <div class="profile-icon">
                            <i data-lucide="tractor"></i>
                        </div>
                        <div>
                            <h2>My Farm Profile</h2>
                            <p>Help us give you personalized farming advice</p>
                        </div>
                    </div>

                    <form id="profile-form" class="profile-form" onsubmit="return false;">
                        <div class="form-row">
                            <div class="form-group">
                                <label for="farmer-name">
                                    <i data-lucide="user" style="width:15px;height:15px;display:inline;vertical-align:middle;margin-right:5px;"></i>
                                    Farmer Name
                                </label>
                                <input type="text" id="farmer-name" placeholder="Your full name">
                            </div>
                            <div class="form-group">
                                <label for="farm-district">
                                    <i data-lucide="map-pin" style="width:15px;height:15px;display:inline;vertical-align:middle;margin-right:5px;"></i>
                                    District
                                </label>
                                <select id="farm-district">
                                    <option value="">Select District</option>
                                    <option value="Araria">Araria</option>
                                    <option value="Arwal">Arwal</option>
                                    <option value="Aurangabad">Aurangabad</option>
                                    <option value="Banka">Banka</option>
                                    <option value="Begusarai">Begusarai</option>
                                    <option value="Bhagalpur">Bhagalpur</option>
                                    <option value="Bhojpur">Bhojpur</option>
                                    <option value="Buxar">Buxar</option>
                                    <option value="Darbhanga">Darbhanga</option>
                                    <option value="East Champaran">East Champaran</option>
                                    <option value="Gaya">Gaya</option>
                                    <option value="Gopalganj">Gopalganj</option>
                                    <option value="Jamui">Jamui</option>
                                    <option value="Jehanabad">Jehanabad</option>
                                    <option value="Kaimur">Kaimur</option>
                                    <option value="Katihar">Katihar</option>
                                    <option value="Khagaria">Khagaria</option>
                                    <option value="Kishanganj">Kishanganj</option>
                                    <option value="Lakhisarai">Lakhisarai</option>
                                    <option value="Madhepura">Madhepura</option>
                                    <option value="Madhubani">Madhubani</option>
                                    <option value="Munger">Munger</option>
                                    <option value="Muzaffarpur">Muzaffarpur</option>
                                    <option value="Nalanda">Nalanda</option>
                                    <option value="Nawada">Nawada</option>
                                    <option value="Patna">Patna</option>
                                    <option value="Purnia">Purnia</option>
                                    <option value="Rohtas">Rohtas</option>
                                    <option value="Saharsa">Saharsa</option>
                                    <option value="Samastipur">Samastipur</option>
                                    <option value="Saran">Saran</option>
                                    <option value="Sheikhpura">Sheikhpura</option>
                                    <option value="Sheohar">Sheohar</option>
                                    <option value="Sitamarhi">Sitamarhi</option>
                                    <option value="Siwan">Siwan</option>
                                    <option value="Supaul">Supaul</option>
                                    <option value="Vaishali">Vaishali</option>
                                    <option value="West Champaran">West Champaran</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label for="farm-village">
                                    <i data-lucide="home" style="width:15px;height:15px;display:inline;vertical-align:middle;margin-right:5px;"></i>
                                    Village
                                </label>
                                <input type="text" id="farm-village" placeholder="Your village name">
                            </div>
                            <div class="form-group">
                                <label for="farm-size">
                                    <i data-lucide="ruler" style="width:15px;height:15px;display:inline;vertical-align:middle;margin-right:5px;"></i>
                                    Farm Size (Bigha)
                                </label>
                                <input type="number" id="farm-size" placeholder="e.g. 5" min="0" step="0.5">
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label for="soil-type">
                                    <i data-lucide="mountain" style="width:15px;height:15px;display:inline;vertical-align:middle;margin-right:5px;"></i>
                                    Soil Type
                                </label>
                                <select id="soil-type">
                                    <option value="">Select Soil Type</option>
                                    <option value="alluvial">Alluvial (जलोढ़)</option>
                                    <option value="clay">Clay (चिकनी मिट्टी)</option>
                                    <option value="sandy">Sandy (बालू मिट्टी)</option>
                                    <option value="loamy">Loamy (दोमट)</option>
                                    <option value="red">Red (लाल मिट्टी)</option>
                                    <option value="black">Black (काली मिट्टी)</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="irrigation-source">
                                    <i data-lucide="droplets" style="width:15px;height:15px;display:inline;vertical-align:middle;margin-right:5px;"></i>
                                    Irrigation Source
                                </label>
                                <select id="irrigation-source">
                                    <option value="">Select Source</option>
                                    <option value="canal">Canal (नहर)</option>
                                    <option value="tubewell">Tube Well (बोरिंग)</option>
                                    <option value="pond">Pond (तालाब)</option>
                                    <option value="rainfed">Rainfed (वर्षा आधारित)</option>
                                    <option value="river">River (नदी)</option>
                                    <option value="well">Open Well (कुआं)</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label>
                                <i data-lucide="wheat" style="width:15px;height:15px;display:inline;vertical-align:middle;margin-right:5px;"></i>
                                Primary Crops (select all that apply)
                            </label>
                            <div class="crop-checkboxes" id="crop-checkboxes">
                                <label class="crop-chip"><input type="checkbox" value="Rice"> 🌾 Rice</label>
                                <label class="crop-chip"><input type="checkbox" value="Wheat"> 🌾 Wheat</label>
                                <label class="crop-chip"><input type="checkbox" value="Maize"> 🌽 Maize</label>
                                <label class="crop-chip"><input type="checkbox" value="Pulses"> 🫘 Pulses</label>
                                <label class="crop-chip"><input type="checkbox" value="Sugarcane"> 🎍 Sugarcane</label>
                                <label class="crop-chip"><input type="checkbox" value="Potato"> 🥔 Potato</label>
                                <label class="crop-chip"><input type="checkbox" value="Onion"> 🧅 Onion</label>
                                <label class="crop-chip"><input type="checkbox" value="Tomato"> 🍅 Tomato</label>
                                <label class="crop-chip"><input type="checkbox" value="Vegetables"> 🥬 Vegetables</label>
                                <label class="crop-chip"><input type="checkbox" value="Mustard"> 🌻 Mustard</label>
                                <label class="crop-chip"><input type="checkbox" value="Banana"> 🍌 Banana</label>
                                <label class="crop-chip"><input type="checkbox" value="Mango"> 🥭 Mango</label>
                            </div>
                        </div>

                        <div id="profile-message" class="profile-message" style="display:none;"></div>

                        <button type="submit" class="btn btn-primary profile-submit" id="profile-save-btn">
                            <i data-lucide="save" style="width:18px;height:18px;display:inline;vertical-align:middle;margin-right:6px;"></i>
                            Save Profile
                        </button>
                    </form>
                </div>

                <div class="profile-card profile-summary-card" id="profile-summary" style="display:none;">
                    <div class="profile-card-header">
                        <div class="profile-icon summary-icon">
                            <i data-lucide="user-check"></i>
                        </div>
                        <div>
                            <h3>Profile Summary</h3>
                            <p>Your saved farm details</p>
                        </div>
                    </div>
                    <div class="summary-grid" id="summary-content">
                        <!-- Filled by JS -->
                    </div>
                </div>
            </div>
        </div>
    </section>

    <style>
        .profile-section {
            padding: 40px 0 80px;
            min-height: calc(100vh - 80px);
            background: linear-gradient(180deg, #f8f9f5 0%, #eef3eb 100%);
        }
        .profile-grid {
            display: grid;
            grid-template-columns: 1fr 340px;
            gap: 28px;
            align-items: start;
        }
        .profile-card {
            background: rgba(255, 255, 255, 0.96);
            border-radius: var(--radius-lg);
            padding: 32px;
            border: 1px solid rgba(45, 90, 39, 0.1);
            box-shadow: 0 12px 40px rgba(45, 90, 39, 0.08);
            animation: slideUp 0.4s ease;
        }
        .profile-card-header {
            display: flex;
            align-items: center;
            gap: 16px;
            margin-bottom: 28px;
        }
        .profile-icon {
            width: 52px;
            height: 52px;
            border-radius: 16px;
            background: linear-gradient(135deg, var(--primary), var(--primary-light));
            display: grid;
            place-items: center;
            color: white;
            box-shadow: 0 8px 24px rgba(45, 90, 39, 0.2);
        }
        .profile-icon i { width: 24px; height: 24px; }
        .summary-icon {
            background: linear-gradient(135deg, var(--accent), #c4884a);
        }
        .profile-card-header h2, .profile-card-header h3 {
            color: var(--primary-dark);
            margin-bottom: 4px;
        }
        .profile-card-header p {
            color: var(--text-muted);
            font-size: 0.9rem;
        }
        .profile-form {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
        .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
        }
        .profile-form .form-group {
            display: flex;
            flex-direction: column;
            gap: 6px;
        }
        .profile-form label {
            font-size: 0.88rem;
            font-weight: 600;
            color: var(--primary-dark);
        }
        .profile-form input,
        .profile-form select {
            padding: 12px 14px;
            border-radius: var(--radius-md);
            border: 1.5px solid rgba(45, 90, 39, 0.15);
            font-size: 0.95rem;
            color: var(--text-main);
            background: rgba(248, 249, 245, 0.8);
            outline: none;
            transition: all 0.2s ease;
            font-family: inherit;
        }
        .profile-form input:focus,
        .profile-form select:focus {
            border-color: var(--primary);
            box-shadow: 0 0 0 3px rgba(45, 90, 39, 0.08);
            background: white;
        }
        .crop-checkboxes {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 4px;
        }
        .crop-chip {
            display: flex;
            align-items: center;
            gap: 5px;
            padding: 8px 14px;
            border-radius: var(--radius-full);
            background: rgba(45, 90, 39, 0.06);
            border: 1.5px solid rgba(45, 90, 39, 0.12);
            font-size: 0.88rem;
            cursor: pointer;
            transition: all 0.2s ease;
            font-weight: 500;
            user-select: none;
        }
        .crop-chip:hover {
            background: rgba(45, 90, 39, 0.12);
        }
        .crop-chip:has(input:checked) {
            background: rgba(45, 90, 39, 0.15);
            border-color: var(--primary);
            color: var(--primary-dark);
            font-weight: 600;
        }
        .crop-chip input[type="checkbox"] {
            width: 16px;
            height: 16px;
            accent-color: var(--primary);
        }
        .profile-message {
            padding: 12px 16px;
            border-radius: var(--radius-sm);
            font-size: 0.9rem;
        }
        .profile-message.success {
            background: rgba(16, 185, 129, 0.08);
            color: var(--success);
            border: 1px solid rgba(16, 185, 129, 0.15);
        }
        .profile-message.error {
            background: rgba(239, 68, 68, 0.08);
            color: var(--error);
            border: 1px solid rgba(239, 68, 68, 0.15);
        }
        .profile-submit {
            padding: 14px;
            font-size: 1rem;
        }
        .summary-grid {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }
        .summary-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 14px;
            border-radius: var(--radius-sm);
            background: rgba(45, 90, 39, 0.04);
        }
        .summary-label {
            font-size: 0.85rem;
            color: var(--text-muted);
            font-weight: 500;
        }
        .summary-value {
            font-size: 0.92rem;
            color: var(--primary-dark);
            font-weight: 600;
            text-align: right;
            max-width: 60%;
        }
        @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 900px) {
            .profile-grid {
                grid-template-columns: 1fr;
            }
            .form-row {
                grid-template-columns: 1fr;
            }
        }
        @media (max-width: 560px) {
            .profile-card {
                padding: 20px;
            }
        }
    </style>
`;
