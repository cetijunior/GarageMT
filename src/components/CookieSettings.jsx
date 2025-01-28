import React, { useState } from "react";

function CookieSettings({ preferences, onSave, onClose }) {
    const [localPreferences, setLocalPreferences] = useState(preferences);

    const handleSave = () => {
        onSave(localPreferences);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-3/4 lg:w-1/3 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Cookie Preferences</h2>
                <p className="text-sm text-gray-600 mb-6">
                    Customize your cookie preferences. Necessary cookies are always enabled.
                </p>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <span>Necessary Cookies</span>
                        <input type="checkbox" checked disabled />
                    </div>
                    <div className="flex items-center justify-between">
                        <span>Analytics Cookies</span>
                        <input
                            type="checkbox"
                            checked={localPreferences.analytics}
                            onChange={() =>
                                setLocalPreferences((prev) => ({ ...prev, analytics: !prev.analytics }))
                            }
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <span>Marketing Cookies</span>
                        <input
                            type="checkbox"
                            checked={localPreferences.marketing}
                            onChange={() =>
                                setLocalPreferences((prev) => ({ ...prev, marketing: !prev.marketing }))
                            }
                        />
                    </div>
                </div>
                <div className="flex justify-end mt-6 gap-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg"
                    >
                        Save Preferences
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CookieSettings;
