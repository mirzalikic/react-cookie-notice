# React Cookie Notice

A lightweight and customizable React component for informing users about the use of cookies on your website.
React Cookie Notice gives you full control over the cookies that will be set by the component.

## Look

![react-cookie-notice](https://raw.githubusercontent.com/mirzalikic/react-cookie-notice/github-pages/images/react-cookie-notice-1.png)
![react-cookie-notice](https://raw.githubusercontent.com/mirzalikic/react-cookie-notice/github-pages/images/react-cookie-notice-2.png)

## Demo

https://mirzalikic.github.io/react-cookie-notice/

## Installation

```shell
npm install react-cookie-notice --save
```

## Usage

Import:

```js
import CookieNotice from 'react-cookie-notice';
```

Usage:

```jsx
<CookieNotice>
    <h3>This website uses cookies</h3>
    <p>We use cookies that help the website to function and also to track how you interact with it. We will only use the cookies if you consent to it by clicking on "Accept all cookies". You can also manage individual cookie preferences.</p>
</CookieNotice>
```

Optionally some props can be set. A full list of available props can be found below.

```js
<CookieNotice
    onSave={(cookies) => {
        console.log(cookies);
    }}
    onInit={(cookies) => {
        console.log(cookies);
    }}
    acceptAllButtonText="Accept"
    cookiePrefix="my-cookie-"
    cookies={[
        { name: 'necessary', checked: true, editable: false, default: true, title: 'Essential', text: 'Essential cookies enable basic functions and are necessary for the proper function of the website. The website cannot function properly without these cookies.' },
        { name: 'marketing', checked: false, editable: true, title: 'Marketing', text: 'Marketing cookies are used to track visitors across websites. They are used by third-party advertisers or publishers to display personalized ads.' },
        { name: 'test', checked: false, editable: true, title: 'Title', text: 'Lorem ipsum dolor sit amet.' }
    ]}>
    <h3>This website uses cookies</h3>
    <p>We use cookies that help the website to function and also to track how you interact with it. We will only use the cookies if you consent to it by clicking on "Accept all cookies". You can also manage individual cookie preferences.</p>
</CookieNotice>
```

## Props

| Name                        | Type     | Default                               | Description                                                                                                        |
| --------------------------- | -------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `preferencesButtonText`     | string   | `Cookie preferences`                  | Content of preferences button.                                                                                     |
| `savePreferencesButtonText` | string   | `Save cookie preferences`             | Content of save preferences button.                                                                                |
| `acceptAllButtonText`       | string   | `Accept all cookies`                  | Content of accept button.                                                                                          |
| `cookies`                   | array    | `Array of objects**`                  | Array of available cookies (see Cookies Property).                                                                 |
| `cookiePrefix`              | string   | `react_cookie_notice_`                | Prefix of the cookie name.                                                                                         |
| `containerClass`            | string   | `react-cookie-notice-container`       | CSS classes of the container div.                                                                                  |
| `contentClass`              | string   | `react-cookie-notice-content`         | CSS classes of the content div.                                                                                    |
| `buttonsClass`              | string   | `react-cookie-notice-buttons`         | CSS classes of the button div.                                                                                     |
| `buttonPrimaryClass`        | string   | `react-cookie-notice-button-primary`  | CSS classes of the primary button.                                                                                 |
| `buttonSecondaryClass`      | string   | `react-cookie-notice-button-secondar` | CSS classes of the secondary button.                                                                               |
| `onSave`                    | function | `(cookies) => {}`                     | Function to be called after any cookie is set. Receives an array of all cookies and their informations.            |
| `onInit`                    | function | `(cookies) => {}`                     | Function to be called after the component is initialized. Receives an array of all cookies and their informations. |
| `containerStyle`            | object   | `{}`                                  | Inline styling for the container div.                                                                              |
| `contentStyle`              | object   | `{}`                                  | Inline styling for the content div.                                                                                |
| `cookieStyle`               | object   | `{}`                                  | Inline styling for the cookie div.                                                                                 |
| `buttonsStyle`              | object   | `{}`                                  | Inline styling for the buttons div.                                                                                |
| `buttonPrimaryStyle`        | object   | `{}`                                  | Inline styling for the primary button.                                                                             |
| `buttonSecondaryStyle`      | object   | `{}`                                  | Inline styling for the secondary button.                                                                           |
| `cookieOptions`             | object   | `{ expires: 365 }`                    | Defines additional cookie attributes. See: https://github.com/js-cookie/js-cookie#cookie-attributes                |
| `toggleVisibility`          | boolean  | `true`                                | Toggles the display of the cookie notice. Change value of toggleVisibility to hide or show.                        |
| `legacyCookie`              | boolean  | `false`                               | Defines whether the legacy cookie is set. See: https://web.dev/samesite-cookie-recipes/                            |
| `legacyCookieOptions`       | boolean  | `{ expires: 365 }`                    | Defines additional legacy cookie attributes. See: https://github.com/js-cookie/js-cookie#cookie-attributes         |
| `showCookiePreferences`     | boolean  | `true`                                | Defines whether the preferences button is displayed.                                                               |

\*\* default value of cookies property

```js
[
    { name: 'necessary', checked: true, editable: false, default: true, title: 'Essential', text: '...' },
    { name: 'marketing', checked: false, editable: true, title: 'Marketing', text: '...' }
];
```

## Cookies Property

You can define as many cookies as you want. A default cookie is required, which is identified with the key `default`.

Example:

```js
[
  { name: 'necessary', checked: true, editable: false, default: true, title: 'Essential', text: '...' },
  ...
];
```

A cookie object has the following properties:

`name`
Name of the cookie. The cookie will be set with the name: prefix + name

`checked`
Defines whether the cookie is preselected in the checkbox.

`editable`
Defines whether the cookie checkbox can be edited. Required cookies should not be editable, like the necessary cookie.

`default`
A cookie in the list must be default. Usually it is the necessary cookie.

`title`
Text that is displayed next to the checkbox.

`text`
Description of the cookie. Will be displayed below the title.
