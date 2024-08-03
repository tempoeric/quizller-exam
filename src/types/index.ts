export interface Question {
  question: string;
  answers: {
    [key: string]: string | null;
  };
  correct_answers: {
    [key: string]: string;
  };
}

export interface State {
  questions: Question[];
  loading: boolean;
  error: string;
}

export interface FetchSuccessAction {
  type: "FETCH_SUCCESS";
  payload: Question[];
}

export interface FetchErrorAction {
  type: "FETCH_ERROR";
}

export type Action = FetchSuccessAction | FetchErrorAction;
