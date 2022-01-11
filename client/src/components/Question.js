import { Component } from 'react'
import { AddIcon } from "@chakra-ui/icons"
import { Stack, Text } from "@chakra-ui/layout";
import { Divider, Box, SimpleGrid, Select, Input, 
    FormHelperText, FormControl, RadioGroup, Radio, Button, Checkbox,
    Textarea, InputRightAddon, InputGroup, Tooltip
} from '@chakra-ui/react'
import { IconButton } from "@chakra-ui/button";
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import { MdRemoveCircleOutline } from "react-icons/md";

class QuestionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            question: '',
            selectedQuestionType: 'single',
            radioValues : ['A', 'B', 'C'],
            newRadioValue: '',
            checkValues: ['Option 1', 'Option 2', 'Option 3'],
            newCheckValue: '',
            totalMarks: 0,
            negativeMarks: 0,
            mandatory: [],
            boxHeight: '240',
            isMandatoryGiven: false
        }
    }

    componentDidMount = () => {
        let props = this.props.questionValue;
        let isMandatoryGiven = false;
        let mandatory = [];
        let boxHeight;
        if(props.mandatory && props.mandatory.length>0) {
            boxHeight = 240 + 260*props.mandatory.length
            boxHeight = boxHeight.toString()
            mandatory = props.mandatory;
            isMandatoryGiven = true
        } else {
            boxHeight='260px'
        }
        this.setState({
            ...this.state,
            question: props.question,
            selectedQuestionType: props.selectedQuestionType,
            radioValues: props.radioValues,
            newRadioValue: props.newRadioValue,
            checkValues: props.checkValues,
            newCheckValue: props.newCheckValue,
            totalMarks: props.totalMarks,
            negativeMarks: props.negativeMarks,
            mandatory: mandatory,
            boxHeight,
            isMandatoryGiven
        })
    }

    handleKeyDownForRadio = (event) => {
        if (event.key === 'Enter' || event.key === 'Tab') {
            let radioValues = this.state.radioValues;
            console.log('existingRadioValues', radioValues)

            radioValues.push(this.state.newRadioValue);
            console.log('updatedRadioValues', radioValues)
            this.setState({
                ...this.state,
                radioValues: radioValues,
                newRadioValue: ''
            })
        }
    }

  handleKeyDownForCheck = (event) => {
    if (event.key === 'Enter' || event.key === 'Tab') {
        let checkValues = this.state.checkValues;
        console.log('existingcheckValues', checkValues)

        checkValues.push(this.state.newCheckValue);
        console.log('updatedcheckValues', checkValues)
        this.setState({
            ...this.state,
            checkValues: checkValues,
            newCheckValue: ''
        })
    }
  }

  handleNewRadioValueChange = (event) => {
    this.setState({
        ...this.state,
        newRadioValue: event.target.value
    })
  }

  handleNewCheckValueChange = (event) => {
    this.setState({
        ...this.state,
        newCheckValue: event.target.value
    })
  }

//   handleRadioOptionChange = (event, radioIndex) => {
//     console.log('inside handleRadioOptionChange', radioIndex)
//     let existingRadioValues = this.state.radioValues;
//   }

  renderSingleChoice = () => {
      console.log('inside renderSingleChoice')
    return (
        <>
            <RadioGroup mt='4'>
                <Stack direction='column'>
                    {this.state.radioValues.map((value, radioValueIndex) => {
                        return (
                            <Radio 
                                value={value} 
                                key={radioValueIndex}>
                                <Input 
                                    size='sm' 
                                    value={value} 
                                    variant='outline' 
                                    w='80'
                                    readOnly
                                    //onChange={() => this.handleRadioOptionChange(radioValueIndex)}
                                />
                                <Tooltip label="Delete option">
                                    <IconButton
                                        color='red'
                                        ml='2' 
                                        size='sm' 
                                        icon={<MdRemoveCircleOutline />} 
                                        isRound='true'
                                        onClick={() => {
                                            let radioValues = this.state.radioValues;
                                            if (radioValueIndex > -1) {
                                                radioValues.splice(radioValueIndex, 1);
                                            }
                                            this.setState({
                                                ...this.state,
                                                radioValues
                                            })
                                        }} 
                                    />
                                </Tooltip>
                            </Radio>                            
                        )
                    })}
                </Stack>
            </RadioGroup>
            <Input 
                size='sm' ml='6' mt='2' 
                placeholder='Add option..' variant='outline' w='80'
                onChange={this.handleNewRadioValueChange}
                onKeyDown={this.handleKeyDownForRadio}
                value={this.state.newRadioValue}
            />
        </>
    )
  }

  renderMultipleChoice = () => {
    return (
        <>
            <Stack direction='column' mt='4'>
                {this.state.checkValues.map((value, checkValueIndex) => {
                    return (
                        <Checkbox colorScheme='green' size='sm' key={checkValueIndex}>
                            <Input size='sm' 
                                value={this.state.newCheckValue}
                                placeholder='Add option..'
                                variant='outline' w='80'
                                value={value}
                                readOnly
                            />
                            <Tooltip label="Delete option">
                                <IconButton
                                    color='red'
                                    ml='2' 
                                    size='sm' 
                                    icon={<MdRemoveCircleOutline />} 
                                    isRound='true'
                                    onClick={() => {
                                        let checkValues = this.state.checkValues;
                                        if (checkValueIndex > -1) {
                                            checkValues.splice(checkValueIndex, 1);
                                        }
                                        this.setState({
                                            ...this.state,
                                            checkValues
                                        })
                                    }} 
                                />
                            </Tooltip>
                        </Checkbox>
                    )
                })}
            </Stack>
            <Input 
                size='sm' ml='5' mt='2' 
                placeholder='Add option..' variant='outline' w='80'
                onChange={this.handleNewCheckValueChange}
                onKeyDown={this.handleKeyDownForCheck}
                value={this.state.newCheckValue}
            />
        </>
    )
  }

  renderParagraph = () => {
    return (
        <>
            <Textarea
                mt='2'
                placeholder='Begin typing..'
                size='sm'
                resize
                h='32'
                variant='filled'
            />
        </>
    )
  }

  renderFileUpload = () => {
    return (
        <>
            <Divider borderColor='black' orientation='horizontal' mb='10' mt='2'/>
            <FilePond
                allowMultiple={true}
                maxParallelUploads={5}
                name='images'
            />
        </>
    )
  }

    handleQuestionTypeChange = (event) => {
        this.setState({
            ...this.state,
            selectedQuestionType: event.target.value
        })
    }

    handleTotalMarksChange = (event) => {
        this.setState({
            ...this.state,
            totalMarks: event.target.value
        })
    }

    handleNegativeMarksChange = (event) => {
        this.setState({
            ...this.state,
            negativeMarks: event.target.value
        })
    }

    handleMandatoryNumberChange = (event) => {
        console.log('inside mand num change', event.target.value)
        let boxHeight;
        let mandatory = [];
        let iterations = event.target.value
        if(!iterations) {
            iterations = 0
        }
        console.log('iterations', iterations)
        for(let i=0; i<parseInt(iterations); i++) {
            if(parseInt(iterations) <=10) {
                //prevent infinite rendering
                let object = {
                    question:'',
                    type: 'single'
                }
                mandatory.push(object)
            }
        }
        if(mandatory.length>0) {
            boxHeight = 240 + 260*mandatory.length
            boxHeight = boxHeight.toString()
        } else {
            boxHeight='260px'
        }
        this.setState({
            ...this.state,
            boxHeight,
            mandatory
        })
    }

    handleQuestionChange = (event) => {
        this.setState({
            ...this.state,
            question: event.target.value
        })
    }

    handleMandQuestionChange = (event) => {
        console.log('inside handleMandQuestionChange');
        console.log(event.target.name);
        console.log(event.target.value);
        let mandatoryArray = this.state.mandatory;
        mandatoryArray[event.target.name].question = event.target.value;
        console.log('mandatoryArray', mandatoryArray)
        // let name = event.target.name;
        // let value = event.target.value;
        this.setState({
            ...this.state,
            mandatory: mandatoryArray
        })
    }

  render() {
    console.log('state in question', this.state)
    return (
        <Box p='6' borderWidth='1px' boxShadow='base' borderRadius='lg' overflow='hidden' w='5xl' mb='2'>
            <SimpleGrid columns={3} spacing={10}>
                <Box height={this.state.boxHeight}>
                <Stack>
                    <FormControl mt='2'>
                        <Select placeholder='Select Question Type'
                            value={this.state.selectedQuestionType}
                            onChange={this.handleQuestionTypeChange}
                            size='sm' variant='filled' w='40'
                        >
                            <option value='single'>Single</option>
                            <option value='multiple'>Multiple</option>
                            <option value='paragraph'>Paragraph</option>
                            <option value='upload'>File Upload</option>
                        </Select>
                        <FormHelperText mt='4'>Total marks</FormHelperText>
                        <InputGroup size='sm'>
                            <Input placeholder='enter marks' value={this.state.totalMarks} w='24' 
                                onChange={this.handleTotalMarksChange}/>
                            <InputRightAddon  children='marks' />
                        </InputGroup>
                        <FormHelperText>Negative marks</FormHelperText>
                        <InputGroup size='sm'>
                            <Input size='sm' placeholder='enter marks' value={this.state.negativeMarks} w='24'
                                onChange={this.handleNegativeMarksChange}
                            />
                            <InputRightAddon  children='marks' />
                        </InputGroup>
                        {this.state.isMandatoryGiven && (
                            <>
                                <FormHelperText>Number of questions mandatory to attempt</FormHelperText>
                                <InputGroup size='sm'>
                                    <Input
                                        type='number'
                                        max='5'
                                        size='sm' 
                                        placeholder='enter number' 
                                        value={this.state.mandatory.length} 
                                        w='24'
                                        onChange={this.handleMandatoryNumberChange}
                                    />
                                    <InputRightAddon  children='question' />
                                </InputGroup>
                            </>
                        )}
                        <br/>
                        <Button size='sm' ml='2' leftIcon={<AddIcon color='red.500'/>} variant='ghost'>
                            Add Optional
                        </Button>
                    </FormControl>
                </Stack>
                </Box>
                <Divider ml='-30' borderColor='black' orientation='vertical' />
                <Box height='120px' ml='-310'>
                    <FormControl>
                        <Input 
                            size='sm' 
                            placeholder='Enter question'
                            value={this.state.question} 
                            onChange={this.handleQuestionChange}
                            variant='unstyled'
                        />
                        {this.state.selectedQuestionType==='single' && this.renderSingleChoice()}
                        {this.state.selectedQuestionType==='multiple' && this.renderMultipleChoice()}
                        {this.state.selectedQuestionType==='paragraph' && this.renderParagraph()}
                        {this.state.selectedQuestionType==='upload' && this.renderFileUpload()}

                        {this.state.mandatory.length>0 && this.state.mandatory.map( (mand, mandKey) => {
                            if(mand.type==='single') {
                                return (
                                    <>
                                        <Text
                                            fontSize='1xl' 
                                            textAlign='center' 
                                            mt='5'
                                        >-OR-</Text>
                                        <Input 
                                            size='sm' 
                                            placeholder='Enter question'
                                            name={mandKey}
                                            value={this.state.mandatory[mandKey].question} 
                                            onChange={this.handleMandQuestionChange}
                                            variant='unstyled'
                                        />
                                        {this.renderSingleChoice()}
                                    </>
                                )
                            } else if(mand.type==='multiple') {
                                return (
                                    <>
                                        <Input
                                            key={mandKey}
                                            size='sm' 
                                            placeholder='Enter question'
                                            value={this.state.mandatory[mandKey].question} 
                                            onChange={this.handleQuestionChange}
                                            variant='unstyled'
                                            readOnly
                                        />
                                        <Text fontSize='2xl' textAlign='center' mt='5'>-OR-</Text>
                                        {this.renderMultipleChoice()}
                                    </>      
                                )
                            } else if(mand.type==='paragraph') {
                                return (
                                    <>
                                        <Input 
                                            size='sm' 
                                            placeholder='Enter question'
                                            value={this.state.mandatory[mandKey].question} 
                                            onChange={this.handleQuestionChange}
                                            variant='unstyled'
                                            readOnly
                                        />
                                        <Text fontSize='2xl' textAlign='center' mt='5'>-OR-</Text>
                                        {this.renderParagraph()}
                                    </>         
                                )
                            } else if(mand.type==='upload') {
                                return (
                                    <>
                                        <Input 
                                            size='sm' 
                                            placeholder='Enter question'
                                            value={this.state.mandatory[mandKey].question} 
                                            onChange={this.handleQuestionChange}
                                            variant='unstyled'
                                            readOnly
                                        />
                                        <Text fontSize='2xl' textAlign='center' mt='5'>-OR-</Text>
                                        {this.renderFileUpload()}
                                    </>         
                                )
                            }
                        })}
                    </FormControl>
                </Box>
            </SimpleGrid>
        </Box>
    );
  }
}

export default QuestionPage;
