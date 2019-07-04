import React, { useEffect, useState } from 'react';
import { withAPI } from '@winwin/api-firebase';
import FrequentQuestions from './FrequentQuestions';

interface FrequentlyAskedQuestionsPageProps {
  api: any;
}

const FrequentlyAskedQuestionsPage: React.FC<FrequentlyAskedQuestionsPageProps> = (props) => {
  const [questionList, setQuestionList] = useState([]);

  useEffect(() => {
    const frequentQuestionsCollection = props.api.data.faq.getAll();
    frequentQuestionsCollection.then(questions =>
      setQuestionList(questionList => questions));
  },        [props.api.data.faq]);

  const handleSubmit = function (question:string, email?:string) {
    props.api.data.faq.addQuestion(question, email);
  };

  return (
    <div>
      <FrequentQuestions questionList={questionList} handleSubmit={handleSubmit}/>
    </div>
  );

};

export default withAPI(FrequentlyAskedQuestionsPage);
