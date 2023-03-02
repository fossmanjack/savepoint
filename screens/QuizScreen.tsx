import {
	FlatList,
	Text,
	View
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

export default function QuizScreen() {

	return (
		<View>
			<Text>Quiz screen</Text>
		</View>
	);
}


/* Notes

FlatList listing displayed quizzes, with bottom item being "create new" and have
an import function also?  Tap a quiz to open the quiz dialog, swipe to edit or
delete.

A filled-out quiz is saved as a timeline object with a quiz-specific tag.  The quiz
object saves "created," "modified," and "history" that shows when the quiz was taken
and that can be used to display the quiz answers by clicking on each entry.

Quizzes can be edited like any timeline entry but (probably) just as text, they don't
feed back into the quiz API.

*/
