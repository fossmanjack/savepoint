### Features

**Journal Timeline**

- Show entries and saves in linear order
- Timeline shows say ten lines, click to show longer
- Tumblr-style tags
- Secondary navigator sidebar to display based on tag, etc
- Newest at top
- Markdown
- Wiki-style links to other entries and to rolodex
- Pictures

**Quicksaves**

- Record time, date, location, mood, weather, and quick notes with minimal clicks

**Rolodex**

- Record info about people you know -- birthday, anniversaries, relationships, how you met

**Encryption**

- Store everything in encrypted redux storage
- Fingerprint lock to access

**Quizzes and Surveys**

- Create your own quizzes and surveys and schedule times to take them
- Single- and multiple-choice or freeform questions
- Quizzes have their own tab but store results as timeline entries

**Import and Export**

- Export to JSON/encrypted?
- Import from exports and .tids?
- Back up to Nextcloud?

### Design

- App opens directly to entry screen with bottom-tab navigation
- Floating action button opens quicksave dialog
- Quicksave auto-populates with location and weather, and has a selection of user-provided messages
- App background customizable

### Problems to Solve

- How to get location data on init
- How to get weather data for acquired location
- How to implement fingerprint lock
- How to implement markdown-to-display
- How to do wiki stuff
