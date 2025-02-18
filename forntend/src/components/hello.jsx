import React, { useRef, useState } from "react";
import "./csvReader.css";

export function Questionnaires() {
    const [videoUrl, setVideoUrl] = useState("");
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState({
        startTime: "",
        endTime: "",
        question: "",
        options: ["", "", "", ""],
        correctAnswer: ""
    });
    const videoRef = useRef(null);

    const handleVideoUrlChange = (e) => {
        setVideoUrl(e.target.value);
    };

    const handleQuestionChange = (e) => {
        const { name, value } = e.target;
        setCurrentQuestion(prev => ({ ...prev, [name]: value }));
    };

    const handleOptionChange = (index, value) => {
        const newOptions = [...currentQuestion.options];
        newOptions[index] = value;
        setCurrentQuestion(prev => ({ ...prev, options: newOptions }));
    };

    const addQuestion = () => {
        setQuestions(prev => [...prev, currentQuestion]);
        setCurrentQuestion({
            startTime: "",
            endTime: "",
            question: "",
            options: ["", "", "", ""],
            correctAnswer: ""
        });
    };

    const handleSubmit = async () => {
        const payload = {
            videoUrl,
            questions
        };

        try {
            const response = await fetch("/submit-questions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            const data = await response.json();
            alert(data.message);
        } catch (error) {
            alert("Failed to submit questions");
            console.error(error);
        }
    };

    return (
        <div>
            <div style={{ marginBottom: "20px" }}>
                <input 
                    type="text" 
                    value={videoUrl} 
                    onChange={handleVideoUrlChange} 
                    placeholder="Enter YouTube video URL" 
                />
            </div>
            <div style={{ display: "flex", gap: "20px" }}>
                <div style={{ flex: 1 }}>
                    <div className="transcript-above">
                        {/* Transcript above video */}
                        <p>Transcript (above video)</p>
                    </div>
                    <video controls ref={videoRef} src={videoUrl} style={{ width: "100%" }} />
                    <div className="transcript-below">
                        {/* Transcript below video */}
                        <p>Transcript (below video)</p>
                    </div>
                </div>
                <div style={{ flex: 1 }}>
                    <div>
                        <input 
                            name="startTime" 
                            value={currentQuestion.startTime} 
                            onChange={handleQuestionChange} 
                            placeholder="Start time" 
                        />
                    </div>
                    <div>
                        <input 
                            name="endTime" 
                            value={currentQuestion.endTime} 
                            onChange={handleQuestionChange} 
                            placeholder="End time" 
                        />
                    </div>
                    <div>
                        <input 
                            name="question" 
                            value={currentQuestion.question} 
                            onChange={handleQuestionChange} 
                            placeholder="Question" 
                        />
                    </div>
                    {currentQuestion.options.map((option, index) => (
                        <div key={index}>
                            <input 
                                value={option} 
                                onChange={(e) => handleOptionChange(index, e.target.value)} 
                                placeholder={`Option ${index + 1}`} 
                            />
                        </div>
                    ))}
                    <div>
                        <input 
                            name="correctAnswer" 
                            value={currentQuestion.correctAnswer} 
                            onChange={handleQuestionChange} 
                            placeholder="Correct answer" 
                        />
                    </div>
                    <div>
                        <button onClick={addQuestion}>Add Question</button>
                    </div>
                    <div>
                        <button onClick={handleSubmit}>Submit All</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Questionnaires;
