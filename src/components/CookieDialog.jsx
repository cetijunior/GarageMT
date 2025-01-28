import React, { useState } from "react";

function CookieDialog({ preferences, onSave, onAcceptAll, onClose }) {
    const [localPreferences, setLocalPreferences] = useState(preferences);

    const handleToggle = (key) => {
        setLocalPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const handleSave = () => {
        onSave(localPreferences);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-red-600 rounded-lg shadow-lg w-full max-w-md p-6 relative">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 hover:text-white font-bold text-lg text-red-950 transition-all"
                    aria-label="Close"
                >
                    &times;
                </button>

                {/* Dialog Header */}
                <h2 className="text-xl font-bold text-white mb-4">Manage Cookie Preferences</h2>
                <p className="text-sm text-gray-50 mb-6">
                    We use cookies to improve your experience. Necessary cookies are always enabled. You can manage your preferences below or accept all cookies.
                </p>

                {/* Preferences */}
                <div className="space-y-4 border-t">
                    <div className="flex items-center mt-5 justify-between">
                        <span className="text-sm font-medium text-black">Necessary Cookies</span>
                        <input type="checkbox" checked disabled className="cursor-not-allowed accent-red-600" />
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-black">Analytics Cookies</span>
                        <input
                            type="checkbox"
                            checked={localPreferences.analytics}
                            onChange={() => handleToggle("analytics")}
                            className="accent-red-800"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-black">Marketing Cookies</span>
                        <input
                            type="checkbox"
                            checked={localPreferences.marketing}
                            onChange={() => handleToggle("marketing")}
                            className="accent-red-800"
                        />
                    </div>
                </div>

                {/* Dialog Footer */}
                <div className="flex justify-end mt-8 gap-4">
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-white hover:bg-red-200 text-sm font-semibold text-black rounded-lg transition-all"
                    >
                        Save Preferences
                    </button>
                    <button
                        onClick={onAcceptAll}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-sm font-semibold text-white rounded-lg transition-all"
                    >
                        Accept All
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CookieDialog;
