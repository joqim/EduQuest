import { Component } from 'react'
import { AddIcon } from "@chakra-ui/icons"
import { Stack } from "@chakra-ui/layout";
import { Divider, Box, SimpleGrid, Select, Input, 
    FormHelperText, FormControl, RadioGroup, Radio, Button, Checkbox,
    Textarea, InputRightAddon, InputGroup
} from '@chakra-ui/react'
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';

class QuestionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedQuestionType: 'single',
            radioValues : ['A', 'B', 'C'],
            newRadioValue: '',
            checkValues: ['Option 1', 'Option 2', 'Option 3'],
            newCheckValue: '',
            totalMarks: 0,
            negativeMarks: 0
        }
    }

    handleKeyDownForRadio = (event) => {
        if (event.key === 'Enter') {
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
    if (event.key === 'Enter') {
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

  renderSingleChoice = () => {
    return (
        <>
            <RadioGroup mt='4'>
                <Stack direction='column'>
                    {this.state.radioValues.map(value => {
                        return (
                            <Radio value={value}>
                                <Input size='sm' value={value} variant='outline' w='80'/>
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
            <Stack direction='column' mt='2'>
                {this.state.checkValues.map(value => {
                    return (
                        <Checkbox colorScheme='green' size='sm'>
                            <Input size='sm' 
                                value={this.state.newCheckValue}
                                placeholder='Add option..'
                                variant='outline' w='80'
                                value={value}
                            />
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

  render() {
    return (
        <Box p='6' borderWidth='1px' boxShadow='base' borderRadius='lg' overflow='hidden' w='5xl' mb='2'>
            <SimpleGrid columns={3} spacing={10}>
                <Box height='240px'>
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
                    What is the size of the earth?
                    {this.state.selectedQuestionType==='single' && this.renderSingleChoice()}
                    {this.state.selectedQuestionType==='multiple' && this.renderMultipleChoice()}
                    {this.state.selectedQuestionType==='paragraph' && this.renderParagraph()}
                    {this.state.selectedQuestionType==='upload' && this.renderFileUpload()}
                </FormControl>
                </Box>
            </SimpleGrid>
        </Box>
    );
  }
}

export default QuestionPage;
