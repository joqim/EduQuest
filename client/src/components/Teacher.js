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
                    name: 'Section 1',
                    description: 'New section 1',
                    shuffle: true,
                    questions: [
                        {
                            question: 'Sample question 1 ?',
                            selectedQuestionType: 'single',
                            radioValues : ['A', 'B', 'C'],
                            newRadioValue: '',
                            checkValues: ['Option 1', 'Option 2', 'Option 3'],
                            newCheckValue: '',
                            totalMarks: 0,
                            negativeMarks: 0
                        },
                        {
                            question: 'Sample question 2',
                            selectedQuestionType: 'multiple',
                            radioValues : ['D', 'E', 'F'],
                            newRadioValue: '',
                            checkValues: ['Option 4', 'Option 5', 'Option 6'],
                            newCheckValue: '',
                            totalMarks: 0,
                            negativeMarks: 0
                        }
                    ]
                },
                {
                    name: 'Section 2',
                    description: 'New section 2',
                    shuffle: false,
                    questions: [
                        {
                            question: 'Sample question 3',
                            selectedQuestionType: 'single',
                            radioValues : ['H', 'I', 'J'],
                            newRadioValue: '',
                            checkValues: ['Option 7', 'Option 8', 'Option 9'],
                            newCheckValue: '',
                            totalMarks: 0,
                            negativeMarks: 0,
                            mandatory: [
                                {
                                    question:'Mand question 1',
                                    type: 'single',
                                    radioValues: ['M1', 'M2', 'M3']
                                },
                                {
                                    question: 'Mand question2 ',
                                    type: 'single'
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
        let sectionsArray = this.state.sections;
        let sectionObject = sectionsArray[sectionIndex];
        let questionsArray = sectionObject.questions;
        let newQuestionObject = {
            question: '',
            selectedQuestionType: 'single',
            radioValues : ['Option 1', 'Option 2', 'Option 3'],
            newRadioValue: '',
            checkValues: ['Option 1', 'Option 2', 'Option 3'],
            newCheckValue: '',
            totalMarks: 0,
            negativeMarks: 0
        }
        questionsArray.push(newQuestionObject)
        sectionObject.questions = questionsArray
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
        //questionsArray.splice(questionIndex, 1);
        questionsArray.shift()
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
        questionsArray.push(questionsArray[0])
        //questionsArray.push(questionsArray[questionIndex])
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
                    radioValues : ['Option 1', 'Option 2', 'Option 3'],
                    newRadioValue: '',
                    checkValues: ['Option 1', 'Option 2', 'Option 3'],
                    newCheckValue: '',
                    totalMarks: 0,
                    negativeMarks: 0
                }
            ]
        }
        let sectionsArray = this.state.sections;
        sectionsArray.push(newSectionObject)
        //when using splice, the sections array is structured as expected
        //but component did mount in section is assuming the final index is the newly added section.
        //sectionsArray.splice(sectionIndex+1, 0, newSectionObject);
        console.log('sectionsArray', sectionsArray)
        this.setState({
            ...this.state,
            sections: sectionsArray
        })
    }

    renderButtonGroup = (sectionIndex, questionIndex) => {
        return (
            <VStack position='relative' left='35%'>
                <Tooltip label="Add a new question">
                    <IconButton 
                        size='sm' 
                        icon={<AiOutlinePlusCircle />} 
                        isRound='true'
                        onClick={() => this.handleAddQuestion(sectionIndex, questionIndex)} 
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
                        onClick={() => this.handleCloneQuestion(sectionIndex, questionIndex)} 
                    />
                </Tooltip>
                <Tooltip label="Delete question">
                    <IconButton 
                        size='sm' 
                        ml={2} 
                        icon={<BiTrashAlt />} 
                        isRound='true'
                        onClick={() => this.handleDeleteQuestion(sectionIndex, questionIndex)}
                        disabled={this.state.sections[sectionIndex].questions.length===1}
                        />
                </Tooltip>
                <Tooltip label="Add a new section">
                    <IconButton 
                        size='sm' 
                        ml={2} 
                        icon={<RiSpotifyLine />} 
                        isRound='true' 
                        onClick={() => this.handleAddNewSection(sectionIndex, questionIndex)}
                    />
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
                {this.state.sections.length>0 && (this.state.sections.map((section, sectionIndex) => {
                    console.log('sectionIndex', sectionIndex)
                    return (
                        <>
                            <Section
                                key={sectionIndex} 
                                sectionValues={this.state.sections[sectionIndex]}
                            />
                            <SimpleGrid columns={2}>
                                {section.questions.length>0 && (section.questions.map((question, questionIndex) => {
                                    return (
                                        <>
                                            <Question 
                                                key={questionIndex} 
                                                questionValue={this.state.sections[sectionIndex].questions[questionIndex]}
                                            />
                                            {questionIndex===0 && this.renderButtonGroup(sectionIndex, questionIndex)}
                                            {/* {this.renderButtonGroup(sectionIndex, questionIndex)} */}
                                            {questionIndex!=0 && (<br />)}
                                        </>
                                    )
                                }))}
                            </SimpleGrid>
                            <br/>
                            {sectionIndex!=this.state.sections.length-1 && (
                                <>
                                    <Text fontSize='2xl' textAlign='center' mt='5'>-SECTION BREAK-</Text>
                                </>                                    
                            )}
                        </>
                    )
                }))}
                <Flex>
                    <Spacer />
                    <Box>
                        <Button colorScheme='teal' variant='ghost' size='sm' mr='5'>
                            Discard
                        </Button>
                        <Button colorScheme='teal' 
                            variant='solid' 
                            size='sm'
                            mr='5'
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
