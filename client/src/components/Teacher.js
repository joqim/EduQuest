import { Component } from 'react'
import { EmailIcon, ArrowForwardIcon } from "@chakra-ui/icons"
import { Text, Stack, Flex, VStack, Heading, HStack, Spacer, Box } from "@chakra-ui/layout";
import { Divider, Button, SimpleGrid, Icon, Tooltip } from '@chakra-ui/react'
import { AiOutlinePlusCircle } from "react-icons/ai";
import { GrGallery } from "react-icons/gr";
import Section from '../components/Section'
import Question from '../components/Question'
import { IconButton } from "@chakra-ui/button";
import { ImCopy } from "react-icons/im";
import { BiTrashAlt } from "react-icons/bi";
import { RiSpotifyLine } from "react-icons/ri";

class TeacherPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPublishClicked: false,
            sections: [
                {
                    name: 'React basics',
                    description: 'Fundamental questions on React',
                    shuffle: true,
                    questions: [
                        {
                            question: 'What of the following is used in React.js to increase performance?',
                            selectedQuestionType: 'single',
                            radioValues : ['Original DOM', 'Virtual DOM', 'Both A and B', 'None of the above'],
                            newRadioValue: '',
                            checkValues: ['Original DOM', 'Virtual DOM', 'Both A and B', 'None of the above'],
                            newCheckValue: '',
                            totalMarks: 0,
                            negativeMarks: 0
                        },
                        {
                            question: 'Which of the following keyword is used to create a class inheritance?',
                            selectedQuestionType: 'multiple',
                            radioValues : ['Create', 'Inherits', 'Extends', 'This'],
                            newRadioValue: '',
                            checkValues: ['Create', 'Inherits', 'Extends', 'This'],
                            newCheckValue: '',
                            totalMarks: 0,
                            negativeMarks: 0
                        }
                    ]
                },
                {
                    name: 'Webpack basics',
                    description: 'Fundamental questions on Webpack',
                    shuffle: false,
                    questions: [
                        {
                            question: 'What is the use of "webpack" command in React.js?',
                            selectedQuestionType: 'single',
                            radioValues : [
                                'Transpile all JavaScript', 
                                'Runs React local development server', 
                                'Module bundler',
                                'None of the above'
                            ],
                            newRadioValue: '',
                            checkValues: [
                                'Transpile all the JavaScript',
                                'Runs React local development server',
                                'Module bundler'
                            ],
                            newCheckValue: '',
                            totalMarks: 0,
                            negativeMarks: 0,
                            mandatory: [
                                {
                                    question:'What is the default port where webpack-server runs?',
                                    type: 'single',
                                    radioValues: ['3000', '8080', '3030', '6060'],
                                    checkValues: ['3000', '8080', '3030', '6060']
                                },
                                {
                                    question: 'What is Babel?',
                                    type: 'multiple',
                                    radioValues: ['Javascript transpiler', 'Javascript interpreter', 'Javascript compiler'],
                                    checkValues: ['Javascript transpiler', 'Javascript interpreter', 'Javascript compiler']
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    }

    handlePublishClicked = () => {
        // let gotThis = this.sectionIndex.current.getAlert();
        // console.log('gotThis', gotThis)
    }

    handleAddQuestion = (sectionIndex, questionIndex) => {
        console.log('inside handleAddQuestion in parent', sectionIndex, questionIndex)
        let sectionsArray = this.state.sections;
        let sectionObject = sectionsArray[sectionIndex];
        let questionsArray = sectionObject.questions;
        let newQuestionObject = {
            question: '',
            selectedQuestionType: 'single',
            radioValues : [],
            newRadioValue: '',
            checkValues: [],
            newCheckValue: '',
            totalMarks: 0,
            negativeMarks: 0
        }
        questionsArray.splice(questionIndex+1, 0, newQuestionObject);
        console.log('updated questionsArray', questionsArray)
        //questionsArray.push(newQuestionObject)
        sectionObject.questions = questionsArray
        console.log('sectionObject', sectionObject)
        sectionsArray[sectionIndex] = sectionObject
        this.setState({
            ...this.state,
            sections: sectionsArray
        })
    }

    handleDeleteQuestion = (sectionIndex, questionIndex) => {
        console.log('questionIndex in delete', questionIndex)
        let sectionsArray = this.state.sections;
        let sectionObject = sectionsArray[sectionIndex];
        let questionsArray = sectionObject.questions;
        questionsArray.splice(questionIndex, 1);
        //questionsArray.shift()
        sectionObject.questions = questionsArray
        sectionsArray[sectionIndex] = sectionObject
        this.setState({
            ...this.state,
            sections: sectionsArray
        })
    }

    handleCloneQuestion = (sectionIndex, questionIndex) => {
        let sectionsArray = this.state.sections;
        let sectionObject = sectionsArray[sectionIndex];
        let questionsArray = sectionObject.questions;
        questionsArray.splice(questionIndex+1, 0, questionsArray[questionIndex]);
        sectionObject.questions = questionsArray
        sectionsArray[sectionIndex] = sectionObject
        this.setState({
            ...this.state,
            sections: sectionsArray
        })
    }

    handleAddNewSection = (sectionIndex, questionIndex) => {
        let newSectionObject = {
            name: '',
            description: '',
            shuffle: false,
            questions: [
                {
                    question: '',
                    selectedQuestionType: 'single',
                    radioValues : [],
                    newRadioValue: '',
                    checkValues: [],
                    newCheckValue: '',
                    totalMarks: 0,
                    negativeMarks: 0
                }
            ]
        }
        let sectionsArray = this.state.sections;
        sectionsArray.splice(sectionIndex+1, 0, newSectionObject);
        this.setState({
            ...this.state,
            sections: sectionsArray
        })
    }

    render() {
        console.log('state in Teacher', this.state)
        return (
            <Stack p={5} ml="20" mt="-7">
                <Text color="black" >
                    Create Questions
                </Text>
                <Divider borderColor='black' orientation='horizontal' />
                {this.state.sections.length>0 && (this.state.sections.map((section, sectionIndex) => {
                    console.log('passing section', this.state.sections[sectionIndex].name)
                    return (
                        <>
                            <Section
                                key={sectionIndex} 
                                sectionValues={this.state.sections[sectionIndex]}
                                sectionIndex={sectionIndex}
                            />
                            <SimpleGrid columns={2}>
                                {section.questions.length>0 && (section.questions.map((question, questionIndex) => {
                                    //console.log('passing question', section.questions)
                                    return (
                                        <>
                                            <Question
                                                key={questionIndex} 
                                                questionValue={this.state.sections[sectionIndex].questions[questionIndex]}
                                                questionIndex={questionIndex}
                                                sectionIndex={sectionIndex}
                                                addQuestion={this.handleAddQuestion}
                                                deleteQuestion={this.handleDeleteQuestion}
                                                cloneQuestion={this.handleCloneQuestion}
                                                addNewSection={this.handleAddNewSection}
                                            />
                                        </>
                                    )
                                }))}
                            </SimpleGrid>
                            <br/>
                            {sectionIndex!=this.state.sections.length-1 && (
                                <>
                                    <Text fontSize='24' fontWeight='thin' textAlign='center' mt='5' color='#BF9B9B'>-SECTION BREAK-</Text>
                                </>                                    
                            )}
                        </>
                    )
                }))}
                <Flex>
                    <Spacer />
                    <Box>
                        <Button color='#BF9B9B' fontWeight='thin' variant='ghost' size='sm' mr='5'>
                            Discard
                        </Button>
                        <Button
                            backgroundColor='#733D47'
                            color='#FFFFFF'
                            variant='solid' 
                            size='sm'
                            mr='24'
                            fontWeight='thin'
                            onClick={this.handlePublishClicked}>
                            Publish
                        </Button>
                    </Box>
                </Flex>
            </Stack>
        );
    }
}

export default TeacherPage;
