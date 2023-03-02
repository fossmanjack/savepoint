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

- [x] How to get location data on init
- [x] How to get weather data for acquired location
- [ ] How to implement fingerprint lock
- [ ] How to implement markdown-to-display
- [ ] How to do wiki stuff

### New Save Screen

Header --- "New Save", options button
Date field, defaults to now, click to open datetime
Location | Weather, default strings, click to edit

Title

Tags

Body

Footer --- Mood, reading, watching, listening, eating, drinking, doing

### Quicksave Dialog

- Date, location, weather
- Tags
- Title is "Quicksave (timestamp)"
- No body, just some pre-entered text chips that can be touched to toggle
- WRUD not included

### Save/Quicksave structure

{
	id: uuid
	title: string
	body: string
	loc: string
	weather: string
	datetime: int				// this is the displayed date and time, the creation is in the meta object
	tags: [ tag1, tag2, ... ]
	mood: string
	reading: string
	watching: string
	listening: string
	eating: string
	drinking: string
	doing/working on: string
	quizData: {
		quiz: { ... },
		answers: { ... }
	},
	images: { ... }
	meta: {
		created: int
		modified: int
		locData: { lat, long, maybe the whole Here object, or just the raw phone data }
		weatherData: { whatever the API gave us }
	}
}

I'm not sure if it's better to store the objects in an array or in an object
indexed by ID or timestamp.  Probably object indexed by timestamp since that will
make sorting and retrieving a range of keys (dates) straightforward, and we'll be
doing that a lot for the timeline.

const _Saves = {
	timestamp: { Save object },
	timestamp: { Save object },
	...
}

On the other hand, consider what we're mostly using that object for: a timeline view,
sorted in reverse chronological order.  This will make use of a FlatList, which wants an
array as its input.  Of course, Object.keys(_Saves) would do the trick just fine.

Eh.  Let's start by using an array of objects and make the change if it creates problems.

### Markdown

Save bodies are stored with markdown intact and are converted to JSX on the fly.
What I need is a markdown-to-JSX converter that also converts things in \[\[tags\]\] to
Pressables that open the linked entry in a pop-up.  It also needs to be able to convert
external links to React Linking objects, right.

- markdown-to-jsx -- for React, might not work with RN?  But outputs a JSX component so maybe ...
- react-markdown is another one to try
