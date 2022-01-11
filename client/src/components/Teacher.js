import { Component } from 'react'
import { EmailIcon, ArrowForwardIcon } from "@chakra-ui/icons"
import { Text, Stack, Flex, VStack, Heading, HStack, Spacer } from "@chakra-ui/layout";
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
            questions: [
                {
                    selectedQuestionType: 'single',
                    radioValues : ['A', 'B', 'C'],
                    newRadioValue: '',
                    checkValues: ['Option 1', 'Option 2', 'Option 3'],
                    newCheckValue: '',
                    totalMarks: 0,
                    negativeMarks: 0
                },
                {
                    selectedQuestionType: 'single',
                    radioValues : ['A', 'B', 'C'],
                    newRadioValue: '',
                    checkValues: ['Option 1', 'Option 2', 'Option 3'],
                    newCheckValue: '',
                    totalMarks: 0,
                    negativeMarks: 0
                }
            ],
            sections: [
                {
                    name: 'Section 1',
                    description: 'New section 1',
                    shuffle: true
                },
                {
                    name: 'Section 2',
                    description: 'New section 2',
                    shuffle: false
                }
            ]
        }
    }

    handleAddQuestion = () => {
        let questionsArray = this.state.questions;
        let newQuestionObject = {
            selectedQuestionType: 'single',
            radioValues : [],
            newRadioValue: '',
            checkValues: [],
            newCheckValue: '',
            totalMarks: 0,
            negativeMarks: 0
        }
        questionsArray.push(newQuestionObject)
        this.setState({
            ...this.state,
            questions: questionsArray
        })
    }

    handleDeleteQuestion = () => {
        let questionsArray = this.state.questions;
        questionsArray.shift()
        this.setState({
            ...this.state,
            questions: questionsArray
        })
    }

    handleCloneQuestion = () => {
        let questionsArray = this.state.questions;
        questionsArray.push(questionsArray[0])
        this.setState({
            ...this.state,
            questions: questionsArray
        })
    }

    renderButtonGroup = () => {
        return (
            <VStack position='relative' left='35%'>
                <Tooltip label="Add a new question">
                    <IconButton 
                        size='sm' 
                        icon={<AiOutlinePlusCircle />} 
                        isRound='true'
                        onClick={this.handleAddQuestion} 
                    />
                </Tooltip>
                <Tooltip label="Add images">
                    <IconButton size='sm' ml={2} icon={<GrGallery />} isRound='true' ></IconButton>
                </Tooltip>
                <Tooltip label="Clone question">
                    <IconButton 
                        size='sm' 
                        ml={2} 
                        icon={<ImCopy />} 
                        isRound='true' 
                        onClick={this.handleCloneQuestion} 
                    />
                </Tooltip>
                <Tooltip label="Delete question">
                    <IconButton 
                        size='sm' 
                        ml={2} 
                        icon={<BiTrashAlt />} 
                        isRound='true'
                        onClick={this.handleDeleteQuestion}
                        disabled={this.state.questions.length===1}
                        />
                </Tooltip>
                <Tooltip label="Add a new section">
                    <IconButton size='sm' ml={2} icon={<RiSpotifyLine />} isRound='true' ></IconButton>
                </Tooltip>
            </VStack>
        )
    }

    render() {
        console.log('state in Teacher', this.state)
        return (
            <Stack p={5} ml="20" mt="-7">
                <Text color="black" >
                    Create Questions
                </Text>
                <Divider borderColor='black' orientation='horizontal' />
                <Section />
                <SimpleGrid columns={2}>
                    {this.state.questions.length>0 && (this.state.questions.map((question, index) => {
                        return (
                            <>
                                <Question key={index}/>
                                {index===0 && this.renderButtonGroup()}
                                {index!=0 && (<br />)}
                            </>
                        )
                    }))}
                </SimpleGrid>
            </Stack>
        );
    }
}

export default TeacherPage;
