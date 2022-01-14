import React,{Component} from "react";
import ReactDOM from "react-dom";
import "./assets/style.css";
import quizService from "./quizService";
import QuestionBox from "./Components/QuestionBox";
import Result from "./Components/Result";
class Quizbee extends Component{
        state = {
                questionBank:[],
                score:0,
                responses:0
        };
        computeAnswer(answer,correct){
                if(answer === correct){
                        this.setState({
                                score:this.state.score +1
                        })
                }
                this.setState({
                        responses : this.state.responses <5 ?this.state.responses + 1:5
                })
        }
        getQuestion = ()=>{
                quizService().then(question=>{
                        this.setState({
                                questionBank: question
                        })
                })
        }
        componentDidMount(){
                this.getQuestion();
                
        }
        playAgain=()=>{
                this.getQuestion();
                this.setState({
                        score:0,
                        responses:0
                })
        }
        render(){
                return(
                        <div className="container">
                                <div className="title"> Quizbee</div>
                                {this.state.questionBank.length > 0 &&
                                this.state.responses < 5 &&
                                         this.state.questionBank.map(({question,answers,correct,questionId})=><QuestionBox question={question} options={answers} kye={questionId} selected ={answer=>this.computeAnswer(answer,correct)}/>
                                        )
                                }
                                {this.state.responses == 5 && <Result score = {this.state.score} playAgain ={this.playAgain}/>}
                        </div>
                );
        }
}
ReactDOM.render(<Quizbee/>,document.getElementById("root"));