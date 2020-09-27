import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';

import './index.css';

const CookieNotice = ({
    children,
    cookies,
    containerClass,
    contentClass,
    cookiePrefix,
    buttonsClass,
    buttonPrimaryClass,
    buttonSecondaryClass,
    onSave,
    onInit,
    preferencesButtonText,
    savePreferencesButtonText,
    acceptAllButtonText,
    containerStyle,
    contentStyle,
    cookiesStyle,
    cookieStyle,
    buttonsStyle,
    buttonPrimaryStyle,
    buttonSecondaryStyle,
    cookieOptions,
    toggleVisibility,
    legacyCookie,
    legacyCookieOptions,
    showCookiePreferences
}) => {
    const legacySuffix = '-legacy';

    let styles = {
        container: containerStyle,
        content: contentStyle,
        cookies: cookiesStyle,
        cookie: cookieStyle,
        buttons: buttonsStyle,
        buttonPrimary: buttonPrimaryStyle,
        buttonSecondary: buttonSecondaryStyle
    };

    const [options, setOptions] = useState({
        visible: false,
        showCookies: false,
        msg: '',
        init: false
    });

    const [availableCookies, setAavailableCookies] = useState(cookies);

    useEffect(() => {
        // toggle visibity of cookie notice on toggleVisibility prop change
        setOptions((state) => ({
            ...state,
            visible: !state.visible
        }));
    }, [toggleVisibility]);

    useEffect(() => {
        // execute effect only one time

        if (options.init === false) {
            const getCookie = (name) => {
                let cookieValue = Cookies.get(cookiePrefix + name, cookieOptions);
                if (cookieValue === undefined) {
                    cookieValue = Cookies.get(cookiePrefix + name + legacySuffix, legacyCookieOptions);
                }
                return cookieValue;
            };

            // find default cookie
            const defaultCookie = availableCookies.filter((cookie) => cookie.default === true);

            // check if default cookie is available
            if (defaultCookie.length > 0) {
                // get value of default cookie, if set. Only the first default cookie will be considered
                const cookieValue = getCookie(defaultCookie[0].name);

                if (cookieValue === undefined) {
                    // show cookie notice if default cookie is not set
                    setOptions((state) => ({
                        ...state,
                        visible: true
                    }));
                } else {
                    // hide cookie notice if default cookie is set
                    setOptions((state) => ({
                        ...state,
                        visible: false
                    }));

                    setAavailableCookies((state) => {
                        return state.map((value) => {
                            value = { ...value, checked: getCookie(value.name) === 'true' };
                            return value;
                        });
                    });
                }

                setOptions((state) => ({
                    ...state,
                    init: true
                }));

                // get current values from available cookies
                const availableCookiesOnInit = availableCookies.map((value) => {
                    value = { ...value, checked: getCookie(value.name) === 'true' };
                    return value;
                });

                onInit(availableCookiesOnInit);
            } else {
                setOptions((state) => ({
                    ...state,
                    msg: 'Missing default cookie. A default cookie is required.'
                }));
            }
        }
    }, [legacyCookieOptions, cookiePrefix, cookieOptions, availableCookies, onInit, options.init]);

    const setCookie = (name, value) => {
        Cookies.set(cookiePrefix + name, value, cookieOptions);

        if (legacyCookie === true) {
            Cookies.set(cookiePrefix + name + legacySuffix, value, legacyCookieOptions);
        }
    };

    const toggleShowCookies = () => {
        setOptions((state) => ({
            ...state,
            showCookies: !state.showCookies
        }));
    };

    const savePreferences = () => {
        availableCookies.forEach((value) => {
            if (value.checked === true || value.editable === false) {
                // set checked cookies or cookies that are not editable. not editable cookie are checked.
                setCookie(value.name, true);
            } else {
                // remove not checked cookies
                Cookies.remove(cookiePrefix + value.name, cookieOptions);
                Cookies.remove(cookiePrefix + value.name + legacySuffix, legacyCookieOptions);
            }
        });

        setOptions((state) => ({
            ...state,
            visible: false
        }));

        onSave(availableCookies);
    };

    const acceptAllCookies = () => {
        // set all cookies and mark all cookies as checked
        setAavailableCookies((state) => {
            const newAvailableCookies = state.map((value) => {
                setCookie(value.name, true);
                value = { ...value, checked: true };
                return value;
            });

            onSave(newAvailableCookies);

            return newAvailableCookies;
        });

        setOptions((state) => ({
            ...state,
            visible: false
        }));
    };

    const checkboxHandler = (name) => {
        setAavailableCookies((state) => {
            return state.map((value) => {
                if (value.editable === true && value.name === name) {
                    value = { ...value, checked: !value.checked };

                    return value;
                }
                return value;
            });
        });
    };

    if (options.msg !== '') {
        return (
            <div className={containerClass} style={styles.container}>
                <div className={contentClass} style={styles.content}>
                    {options.msg}
                </div>
            </div>
        );
    }
    if (options.visible === false) {
        return null;
    }
    return (
        <div className={containerClass} style={styles.container}>
            <div className={contentClass} style={styles.content}>
                {children}
                {options.showCookies && (
                    <ul style={styles.cookies}>
                        {availableCookies.map((value, index) => {
                            return (
                                <li style={styles.cookie} key={index}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name={value.name}
                                            onChange={() => {
                                                checkboxHandler(value.name);
                                            }}
                                            checked={value.editable === false ? true : value.checked}
                                        />
                                        <strong>{value.title}</strong>
                                        <p style={styles.cookieText}>{value.text}</p>
                                    </label>
                                </li>
                            );
                        })}
                    </ul>
                )}

                <div className={buttonsClass} style={styles.buttons}>
                    {showCookiePreferences ? (
                        options.showCookies ? (
                            <button
                                className={buttonSecondaryClass}
                                style={styles.buttonSecondary}
                                onClick={() => {
                                    savePreferences();
                                }}>
                                {savePreferencesButtonText}
                            </button>
                        ) : (
                            <button
                                className={buttonSecondaryClass}
                                style={styles.buttonSecondary}
                                onClick={() => {
                                    toggleShowCookies();
                                }}>
                                {preferencesButtonText}
                            </button>
                        )
                    ) : null}

                    <button
                        className={buttonPrimaryClass}
                        style={styles.buttonPrimary}
                        onClick={() => {
                            acceptAllCookies();
                        }}>
                        {acceptAllButtonText}
                    </button>
                </div>
            </div>
        </div>
    );
};

CookieNotice.defaultProps = {
    preferencesButtonText: 'Cookie preferences',
    savePreferencesButtonText: 'Save cookie preferences',
    acceptAllButtonText: 'Accept all cookies',
    cookies: [
        { name: 'necessary', checked: true, editable: false, default: true, title: 'Essential', text: 'Essential cookies enable basic functions and are necessary for the proper function of the website. The website cannot function properly without these cookies.' },
        { name: 'marketing', checked: false, editable: true, title: 'Marketing', text: 'Marketing cookies are used to track visitors across websites. They are used by third-party advertisers or publishers to display personalized ads.' }
    ],
    cookiePrefix: 'react_cookie_notice_',
    containerClass: 'react-cookie-notice-container',
    contentClass: 'react-cookie-notice-content',
    buttonsClass: 'react-cookie-notice-buttons',
    buttonPrimaryClass: 'react-cookie-notice-button-primary',
    buttonSecondaryClass: 'react-cookie-notice-button-secondary',
    onSave: (cookies) => {},
    onInit: (cookies) => {},
    containerStyle: {},
    contentStyle: {},
    cookiesStyle: {},
    cookieStyle: {},
    buttonsStyle: {},
    buttonPrimaryStyle: {},
    buttonSecondaryStyle: {},
    cookieOptions: { expires: 365 },
    toggleVisibility: true,
    legacyCookie: false,
    legacyCookieOptions: { expires: 365 },
    showCookiePreferences: true
};

CookieNotice.propTypes = {
    preferencesButtonText: PropTypes.string,
    savePreferencesButtonText: PropTypes.string,
    acceptAllButtonText: PropTypes.string,
    cookies: PropTypes.arrayOf(PropTypes.object),
    cookiePrefix: PropTypes.string,
    containerClass: PropTypes.string,
    contentClass: PropTypes.string,
    buttonsClass: PropTypes.string,
    buttonPrimaryClass: PropTypes.string,
    buttonSecondaryClass: PropTypes.string,
    onSave: PropTypes.func,
    onInit: PropTypes.func,
    containerStyle: PropTypes.object,
    contentStyle: PropTypes.object,
    cookiesStyle: PropTypes.object,
    cookieStyle: PropTypes.object,
    buttonsStyle: PropTypes.object,
    buttonPrimaryStyle: PropTypes.object,
    buttonSecondaryStyle: PropTypes.object,
    cookieOptions: PropTypes.object,
    toggleVisibility: PropTypes.bool,
    legacyCookie: PropTypes.bool,
    legacyCookieOptions: PropTypes.object,
    showCookiePreferences: PropTypes.bool
};

export default CookieNotice;
