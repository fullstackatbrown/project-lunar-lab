/**
 * ThemeToggle
 *
 * This component renders the theme toggle button in the navbar.
 *
 * Responsibilities:
 *
 * 1. Display a button (moon icon) in the rightmost area of the navbar.
 *
 * 2. Trigger the theme toggle action when clicked.
 *    - Calls the toggle function provided by ThemeProvider.
 *
 * 3. Act only as a UI trigger.
 *    - It does NOT manage theme state.
 *    - It does NOT interact with localStorage.
 *    - It does NOT modify the HTML root directly.
 *
 * All theme logic should remain inside ThemeProvider.
 */