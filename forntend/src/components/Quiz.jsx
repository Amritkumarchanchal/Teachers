import React, { useState } from 'react';
import YouTube from 'react-youtube';
import "./csvReader.css"; // Ensure the CSS file is correctly named and imported

export function QuizCreator() {
    const [videoUrl, setVideoUrl] = useState("");
    const [videoId, setVideoId] = useState("");
    const [transcript, setTranscript] = useState("");
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState({
        startTime: "",
        endTime: "",
        questionText: "",
        options: ["", "", "", ""],
        correctAnswer: ""
    });

    const extractVideoId = url => {
        const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[^\/\n\s])|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
        return match ? match[1] : null;
    };

    const handleVideoUrlSubmit = (e) => {
        e.preventDefault();
        const id = extractVideoId(videoUrl);
        if (id) {
            setVideoId(id);
        }
    };

    const addQuestion = () => {
        setQuestions([...questions, currentQuestion]);
        setCurrentQuestion({
            startTime: "",
            endTime: "",
            questionText: "",
            options: ["", "", "", ""],
            correctAnswer: ""
        });
    };

    const updateOptions = (index, value) => {
        const newOptions = [...currentQuestion.options];
        newOptions[index] = value;
        setCurrentQuestion({ ...currentQuestion, options: newOptions });
    };

    const handleSubmit = () => {
        console.log(JSON.stringify(questions)); // Handle JSON file generation as needed
    };

    return (
        <div className="page ">
            <div className="quiz-creator">
                <form onSubmit={handleVideoUrlSubmit}>
                    <input
                        type="text"
                        value={videoUrl}
                        onChange={e => setVideoUrl(e.target.value)}
                        placeholder="Enter YouTube video URL and press Enter"
                    />
                    <button type="submit">Load Video</button>
                </form>
                {videoId && (
                    <div className="video-container">
                        <YouTube videoId={videoId} opts={{ width: '100%', height: '390' }} />
                        <div className="transcript-demo">
                            <button
                                onClick={() =>
                                    setTranscript(
                                        "This is a demo transcript. It simulates how a transcript might be loaded and displayed from the video."
                                    )
                                }
                            >
                                Load Demo Transcript
                            </button>
                            <textarea
                                value={transcript}
                                onChange={e => setTranscript(e.target.value)}
                                placeholder="Transcript"
                            />
                        </div>
                    </div>
                )}
            </div>
            <div className="questions-container">
                <div className="question-form">
                    <input
                        type="text"
                        value={currentQuestion.startTime}
                        onChange={e => setCurrentQuestion({ ...currentQuestion, startTime: e.target.value })}
                        placeholder="Start time"
                    />
                    <input
                        type="text"
                        value={currentQuestion.endTime}
                        onChange={e => setCurrentQuestion({ ...currentQuestion, endTime: e.target.value })}
                        placeholder="End time"
                    />
                    <input
                        type="text"
                        value={currentQuestion.questionText}
                        onChange={e => setCurrentQuestion({ ...currentQuestion, questionText: e.target.value })}
                        placeholder="Question text"
                    />
                    {currentQuestion.options.map((option, index) => (
                        <input
                            key={index}
                            type="text"
                            value={option}
                            onChange={e => updateOptions(index, e.target.value)}
                            placeholder={`Option ${index + 1}`}
                        />
                    ))}
                    <input
                        type="text"
                        value={currentQuestion.correctAnswer}
                        onChange={e => setCurrentQuestion({ ...currentQuestion, correctAnswer: e.target.value })}
                        placeholder="Correct answer"
                    />
                    <button onClick={addQuestion}>Add Question</button>
                </div>
                <button onClick={handleSubmit}>Submit All Questions</button>
            </div>
        </div>
    );
}

export default QuizCreator;
