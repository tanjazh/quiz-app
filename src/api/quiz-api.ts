import axios from "axios";
import { FetchQuizCategoriesResp, FetchQuizParams, QuizCategory, QuizItem, FetchQuizResponse } from '../Types/quiz-types';


//async function always return a promise!
const BASE_URL = "https://opentdb.com";

export class QuizAPI {
    static async fetchCategories(): Promise<QuizCategory[]> {
        try {
            const { data } = await axios.get<FetchQuizCategoriesResp>
                (`${BASE_URL}/api_category.php`);
            return data.trivia_categories;
        } catch (error) {
            console.log("Error fetching quiz categories");
            throw error;
        }
    }

    static async fetchQuiz(parameters: FetchQuizParams): Promise<QuizItem[]> {
        try {
            const { data } = await axios.get<FetchQuizResponse>(`${BASE_URL}/api.php`, { params: parameters })
            return data.results;
        } catch (error) {
            console.log("Error fetching quiz");
            throw error;
        }

    }
}