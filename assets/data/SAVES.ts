export const initialSaves = [
	{
		id: '185c679cd16',
		title: 'First save',
		body: `### Welcome to SavePoint!

		Here you will be able to record your thoughts, feelings, and activities with a record of where you were and what the world around you was like.  You can use **markdown** to format your saves, or you can use a *QuickSave* to take a quick snapshot of what's going on.

		Good luck, and enjoy!`,
		loc: 'Middle of nowhere, USA',
		weather: '68F and Sunny',
		datetime: 1674072149270,
		tags: [ 'firstPost', 'sampleTag' ],
		mood: [ 'Cheerful', '' ],
		reading: 'Slaughterhouse-Five',
		watching: 'Our Flag Means Death',
		listening: 'Local 717',
		eating: 'Tacos',
		drinking: 'Martini',
		workingOn: 'SavePoint',
		quizData: {},
		images: [],
		meta: {
			created: 1674072149270,
			modified: 1674072149270,
			locData: {},
			weatherData: {},
		},
	}
]


/* Structure
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
*/
