import { useDispatch, useSelector } from 'react-redux';
import {
	TextInput,
	View
} from 'react-native';
import { useState } from 'react';

export default function SaveScreen() {

	return (

	);
}


/* Notes

Title
Tags
Entry
Activity
"Almanac" button, brings up dialog auto-populated with date, time, location,
weather, etc, all of which can be edited
Save button
Clear button

Behavior:
- This screen reflects currentEntry in the Redux state
- Inputting text or hitting the almanac button copies the background almanac
  data into this entry
- "Saving" an entry inserts this into the timeline and clears currentEntry and
  the almanac data
- Thus, before we can start working on this, we have to get the almanac thunk
  in place
- "Almanac" is a publication of current data, per Wikipedia, so it's an appropriate
  word to use here



*/
