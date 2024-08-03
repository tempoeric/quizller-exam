import { FC } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Question } from "types";

import HomepageAI from "assets/img/Homepage.svg?react";
import ForgeIcon from "assets/img/forge.svg?react";

interface HomepageProps {
  onStartQuiz: () => void;
}

export const Homepage: FC<HomepageProps> = ({ onStartQuiz }) => {
  const navigate = useNavigate();

  const startQuiz = async () => {
    try {
      const response = await axios.get<Question[]>(
        `https://quizapi.io/api/v1/questions?apiKey=${
          import.meta.env.VITE_API_KEY
        }&limit=10&tags=javascript`,
      );
      onStartQuiz();
      navigate("/quiz", { state: { questions: response?.data } });
    } catch (error) {
      console.error("Error fetching quiz data:", error);
    }
  };

  return (
    <div className="bg-blue-primary min-h-screen flex items-center justify-center overflow-hidden">
      <div className="relative flex items-center w-full h-full">
        <HomepageAI className="w-full h-full" />
        <div className="absolute flex flex-col items-end right-8 lg:right-[20rem]">
          <h1 className="font-bebas text-white text-6xl md:text-8xl lg:text-[14.5rem] m-0 p-0">
            QUIZZLER
          </h1>
          <div className="flex m-0 p-0">
            <p className="flex font-sora text-white text-xs mr-4">BY:</p>
            <ForgeIcon />
          </div>
          <button
            className="mt-8 font-sora text-3xl text-white py-2 px-4 rounded-full"
            onClick={startQuiz}
          >
            Let's start the quiz →
          </button>
        </div>
      </div>
    </div>
  );
};
