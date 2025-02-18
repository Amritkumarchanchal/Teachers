import React, { useState } from "react";
import "./csvReader.css";

export function Questionnaire() {
    const [videoLink, setVideoLink] = useState("");
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState({
        startTime: "",
        endTime: "",
        question: "",
        options: ["", "", "", ""],
        correctOption: -1
    });

    const handleVideoLinkChange = (event) => {
        setVideoLink(event.target.value);
    };

    const handleQuestionChange = (key, value) => {
        setCurrentQuestion({ ...currentQuestion, [key]: value });
    };

    const handleOptionChange = (index, value) => {
        const updatedOptions = currentQuestion.options.map((option, i) => {
            if (i === index) return value;
            return option;
        });
        setCurrentQuestion({ ...currentQuestion, options: updatedOptions });
    };

    const addQuestion = () => {
        if (
            currentQuestion.correctOption === -1 ||
            currentQuestion.question === "" ||
            currentQuestion.options.some((option) => option === "")
        ) {
            alert("Please complete the question and all options before adding.");
            return;
        }
        setQuestions([...questions, currentQuestion]);
        setCurrentQuestion({
            startTime: "",
            endTime: "",
            question: "",
            options: ["", "", "", ""],
            correctOption: -1
        });
    };

    const handleSubmit = () => {
        const data = {
            videoLink,
            questions
        };
        console.log(JSON.stringify(data));
        alert("Data prepared for submission");
    };

    return (
        <div className="container fullscreen">
            <h1>Interactive Questionnaire</h1>
            <div className="input-section">
                <div className="two-thirds">
                    <input
                        type="text"
                        placeholder="Paste video link here"
                        value={videoLink}
                        onChange={handleVideoLinkChange}
                    />
                </div>
                <div className="one-third">
                    <input
                        type="text"
                        placeholder="Start time (e.g., 00:01:30)"
                        value={currentQuestion.startTime}
                        onChange={(e) => handleQuestionChange("startTime", e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="End time (e.g., 00:02:15)"
                        value={currentQuestion.endTime}
                        onChange={(e) => handleQuestionChange("endTime", e.target.value)}
                    />
                    <textarea
                        placeholder="Enter the question here"
                        value={currentQuestion.question}
                        onChange={(e) => handleQuestionChange("question", e.target.value)}
                    />
                    {currentQuestion.options.map((option, index) => (
                        <input
                            key={index}
                            type="text"
                            placeholder={`Option ${index + 1}`}
                            value={option}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                        />
                    ))}
                    <input
                        type="number"
                        placeholder="Correct option number"
                        value={currentQuestion.correctOption + 1}
                        onChange={(e) =>
                            handleQuestionChange("correctOption", parseInt(e.target.value) - 1)
                        }
                    />
                    <button onClick={addQuestion}>Add Question</button>
                    <button className="submit-button" onClick={handleSubmit}>
                        Submit All
                    </button>
                </div>
            </div>
        </div>
    );
}