import { IQuestion } from '../types/question';
import { useEffect, useState } from 'react';
import { getQuestionList } from '../api/qnaAPI';


const initialState: IQuestion[] = [
  {
    'qno': 0,
    'title': '',
    'writer': '',
    'category': 'APP',
    'createdDate': '',
    'qcontent': '',
    'status': '답변대기',
    'images': [],
    'del_flag': false,
    'is_public': true,
    'viewCount': 0

  }
];

const UseQuestion = () => {

  const [questions, setQuestions] = useState<IQuestion[]>(initialState);



  useEffect(() => {
    // const fetchQuestions = async () => {
    //   try {
    //     const data = await getQuestionList(); // API 호출
    //     setQuestions(data); // 상태에 데이터 저장
    //   } catch (error) {
    //     console.error('Error fetching QnA list:', error);
    //   }
    // };
    const fetchQuestions = async () => {
      try {
        const data = await getQuestionList();
        console.log('Fetched data:', data);
        data.forEach((item: IQuestion) => {
          console.log(`Category in question ${item.qno}:`, item.category);
        });
        setQuestions(data);
      } catch (error) {
        console.error('Error fetching QnA list:', error);
      }
    };
    fetchQuestions();
  }, [setQuestions]);


  return {questions, setQuestions};
};

export default UseQuestion;