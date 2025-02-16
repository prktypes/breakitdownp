import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { jellyTriangle } from 'ldrs'
import { useNavigate, useLocation } from 'react-router-dom';

jellyTriangle.register()

// Default values shown

const API_URL = "http://localhost:3000/api/data";

function StudyPage() {
  const location = useLocation();
  const { subject, topic, additionalReq } = location.state || {};

  const [data, setData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/'); // Redirect to home if not authenticated
    }
    fetchData();
  }, [subject, topic, additionalReq, navigate]);

  const fetchData = () => {
    console.log('Fetching data with:', { subject, topic, additionalReq });
    setLoading(true);
    setError(null);
    fetch(API_URL, {
      headers: {
        'subject': subject,
        'topic': topic,
        'additionalReq': additionalReq
      }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    const currentSection = data?.sections[currentIndex];

    if (currentSection && option === currentSection.answer) {
      console.log("Correct answer!");
      markActivityAsSolved(); // Update activity data when the user solves a question correctly
    } else {
      console.log("Incorrect answer!");
    }
  };

  const markActivityAsSolved = () => {
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    const storedActivityData = JSON.parse(localStorage.getItem('activityData')) || [];
    
    const existingEntry = storedActivityData.find(item => item.date === today);
    if (existingEntry) {
      existingEntry.count += 1; // Increment the count for today
    } else {
      storedActivityData.push({ date: today, count: 1 }); // Add today's date with a count of 1
    }

    localStorage.setItem('activityData', JSON.stringify(storedActivityData)); // Update local storage
  };

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-lg text-red-500">Error: {error}</p>;
  if (!data || !data.sections || data.sections.length === 0) return <p className="text-center text-lg">No data available.</p>;

  const currentSection = data.sections[currentIndex];

  const handleNext = () => {
    if (currentIndex < data.sections.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleUpcomingTopicClick = (subject,topic,additionalReq) => {
    console.log(subject,topic,additionalReq);
  };
  return (
    <div className="relative flex-1 flex justify-center items-center">
      {loading ? (
        <div className="flex items-center justify-center min-h-screen w-full">
          <l-grid
            size="60"
            speed="1.5" 
            color="black"
          ></l-grid>
        </div>
      ) : (
        <Card className="my-40 w-[400px] min-h-[300px] max-h-[600px] text-center bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg">
          <CardHeader>
            <CardTitle className="text-black/90 font-newstar text-4xl">
              {currentSection?.type === "teaching" ? "Teaching" : currentSection?.type === "question" ? "Question" : "Upcoming Content"}
            </CardTitle>
            <CardDescription className="text-black/70 font-newstar text-2xl">
              {currentSection?.type === "question" ? "Quiz Time!" : currentSection?.type === "teaching" ? "Learn Something New" : "Stay Tuned!"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {currentSection?.type === "teaching" && <p className="text-black/80 font-serif">{currentSection.content}</p>}

            {currentSection?.type === "question" && (
              <div>
                <p className="font-semibold text-black/90 font-serif">{currentSection.question}</p>
                <ul className="mt-2">
                  {currentSection.options.map((option, index) => (
                    <li 
                      key={index} 
                      className={`p-2 border rounded-md cursor-pointer mb-2 backdrop-blur-sm font-serif
                        ${!selectedOption 
                          ? 'bg-gray-200/30 hover:bg-gray-300/30'
                          : selectedOption === option
                            ? option === currentSection.answer
                              ? 'bg-green-200/30 hover:bg-green-300/30'
                              : 'bg-red-200/30 hover:bg-red-300/30'
                            : 'bg-gray-200/30 hover:bg-gray-300/30'
                        }`}
                      onClick={() => handleOptionClick(option)}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {currentSection?.type === "upcoming_content" && (
              <div>
                <p className="font-semibold">Upcoming Content</p>
                <ul className="mt-2">
                  {currentSection.upcoming_topics.map((topic, index) => (
                    <Button 
                      variant='ghost' 
                      key={index} 
                      className="p-2 border rounded-md mb-2" 
                      onClick={() =>{ setCurrentIndex(0)}}
                    >
                      {topic}
                    </Button>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <div className="flex justify-between w-full px-6 py-2">
              <Button 
                variant="outline" 
                onClick={handlePrevious} 
                disabled={currentIndex === 0}
              >
                Previous
              </Button>
              <Button variant="outline">
                <Bookmark className="mr-2" />
                Save
              </Button>
              <Button 
                onClick={handleNext} 
                disabled={currentIndex === data.sections.length - 1}
              >
                Next
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}

export default StudyPage;