import { Component } from 'react'
import { Stack, Text } from "@chakra-ui/layout";
import { Divider, Box, SimpleGrid, Select, Input, 
    FormHelperText, FormControl, RadioGroup, Radio, Button, Checkbox,
    Textarea, InputRightAddon, InputGroup, Tooltip, VStack, InputRightElement, InputLeftElement
} from '@chakra-ui/react'
// import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import { AiFillPlusCircle, AiFillCopy } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import { BiTrashAlt } from "react-icons/bi";
import { RiSpotifyLine } from "react-icons/ri";
import { IoMdAddCircle, IoMdImage } from "react-icons/io";
import { IoCloseCircleSharp } from "react-icons/io5";
import '../css/style.css'

class QuestionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            question: '',
            selectedQuestionType: 'single',
            radioValues : [],
            radioValuesShow: [],
            newRadioValue: '',
            checkValues: ['Option 1', 'Option 2', 'Option 3'],
            checkValuesShow: [],
            newCheckValue: '',
            totalMarks: 0,
            negativeMarks: 0,
            mandatory: [],
            boxHeight: '240',
            isMandatoryGiven: false,
            renderButtonGroup: false,
            questionIndex: null,
            sectionIndex: null,
            isMobile: false
        }
    }

    componentDidMount = () => {
        let isMobile = false; //initiate as false
        if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
        isMobile = true;
        }
        let props = this.props.questionValue;
        let radioValuesShow = [], checkValuesShow = [];
        for(let i=0; i<props.radioValuesShow.length; i++) {
            radioValuesShow.push(false)
        }
        for(let i=0; i<props.checkValues.length; i++) {
            checkValuesShow.push(false)
        }
        //console.log('question value in component mound', props)
        let isMandatoryGiven = false;
        let mandatory = [];
        let boxHeight;
        if(props.mandatory && props.mandatory.length>0) {
            boxHeight = 240 + 270*props.mandatory.length
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
            radioValuesShow,
            checkValuesShow,
            mandatory: mandatory,
            boxHeight,
            isMandatoryGiven,
            questionIndex: this.props.questionIndex,
            sectionIndex: this.props.sectionIndex,
            isMobile
        })
    }

    componentWillReceiveProps = (nextProps) => {
        let isMobile = false; //initiate as false
        if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
        isMobile = true;
        }
            let props = nextProps.questionValue;
            let radioValuesShow = [], checkValuesShow = [];
            for(let i=0; i<props.radioValuesShow.length; i++) {
                radioValuesShow.push(false)
            }
            for(let i=0; i<props.checkValues.length; i++) {
                checkValuesShow.push(false)
            }
            let isMandatoryGiven = false;
            let mandatory = [];
            let boxHeight;
            if(props.mandatory && props.mandatory.length>0) {
                boxHeight = 240 + 270*props.mandatory.length
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
                radioValuesShow,
                checkValuesShow,
                mandatory: mandatory,
                boxHeight,
                isMandatoryGiven,
                questionIndex: nextProps.questionIndex,
                sectionIndex: nextProps.sectionIndex,
                isMobile
            })
    }

    handleKeyDownForRadio = (event) => {
        if (event.key === 'Enter' || event.key === 'Tab') {
            let radioValues = this.state.radioValues;
            console.log('existingRadioValues', radioValues)

            radioValues.push(this.state.newRadioValue);
            console.log('updatedRadioValues', radioValues)
            let radioValuesShow = this.state.radioValuesShow;
            radioValuesShow.push(false);
            this.setState({
                ...this.state,
                radioValues: radioValues,
                newRadioValue: '',
                radioValuesShow
            })
        }
    }

  handleKeyDownForCheck = (event) => {
    if (event.key === 'Enter' || event.key === 'Tab') {
        let checkValues = this.state.checkValues;
        console.log('existingcheckValues', checkValues)

        checkValues.push(this.state.newCheckValue);
        console.log('updatedcheckValues', checkValues)
        let checkValuesShow = this.state.checkValuesShow;
        checkValuesShow.push(false);
        this.setState({
            ...this.state,
            checkValues: checkValues,
            newCheckValue: '',
            checkValuesShow
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

  handleRadioOptionChange = (index, value) => {
    console.log('inside handleRadioOptionChange', index, value)
  }

  renderSingleChoice = (radioValues) => {
    //console.log('inside renderSingleChoice')
    //let radioValues = this.state.radioValues
    return (
        <>
            <RadioGroup mt='4' ml='2'>
                <Stack direction='column'>
                    {radioValues.map((value, radioValueIndex) => {
                        return (
                            <Radio 
                                value={value} 
                                key={radioValueIndex}
                                onClick={() => {
                                    let radioValuesShow = this.state.radioValuesShow;
                                    radioValuesShow.map((value, index) => {
                                        radioValuesShow[index] = false;
                                    })
                                    console.log('pre update radioValuesShow', radioValuesShow)
                                    radioValuesShow[radioValueIndex] = true;
                                    console.log('updated radioValuesShow', radioValuesShow)
                                    this.setState({
                                        ...this.state,
                                        radioValuesShow
                                    })
                                }}
                                >
                                <InputGroup w='80' size='sm'>
                                    <InputLeftElement>
                                        <Box bg='#733D47' w='5' textAlign='center' color='white' borderRadius='sm'>
                                            {String.fromCharCode(65 + parseInt(radioValueIndex))}
                                        </Box>
                                    </InputLeftElement>
                                    <InputRightElement  color='#BF9B9B'>
                                        <IoCloseCircleSharp
                                            size='22'
                                            onClick={() => {
                                                if (radioValueIndex > -1) {
                                                    radioValues.splice(radioValueIndex, 1);
                                                }
                                                this.setState({
                                                    ...this.state,
                                                    radioValues
                                                })
                                            }}
                                        />
                                    </InputRightElement>
                                    {!this.state.radioValuesShow[radioValueIndex] && (<Input
                                        size='sm'
                                        value={value}
                                        color='#733D47'
                                        w='80'
                                        readOnly
                                        //onChange={() => this.handleRadioOptionChange(radioValueIndex, value)}
                                    />)}
                                    {this.state.radioValuesShow[radioValueIndex] && (
                                        <Input
                                            size='sm'
                                            value={value}
                                            color='#733D47'
                                            w='80'
                                            readOnly
                                            backgroundColor='#F2D8D5'
                                        //onChange={() => this.handleRadioOptionChange(radioValueIndex, value)}
                                    />)}
                                    
                                </InputGroup>
                            </Radio>                            
                        )
                    })}
                </Stack>
            </RadioGroup>
            <Input 
                size='sm' ml='8' mt='2' 
                placeholder='Add option..' variant='outline' w='80'
                fontWeight='thin'
                onChange={this.handleNewRadioValueChange}
                onKeyDown={this.handleKeyDownForRadio}
                value={this.state.newRadioValue}
            />
        </>
    )
  }

  handleCheckChange = (checkValueIndex, event) => {
    console.log('isChecked', event.target.checked)
    console.log('checkValueIndex', checkValueIndex)
    let checkValuesShow = this.state.checkValuesShow

    if(!event.target.checked) {
        if (checkValueIndex !== -1) {
            checkValuesShow[checkValueIndex] = false;
        }
    } else {
        checkValuesShow[checkValueIndex] = true;
    }
    this.setState({
        ...this.state,
        checkValuesShow
    })
  }

  renderMultipleChoice = (checkValues) => {
    return (
        <>
            <Stack direction='column' mt='4' ml='2'>
                {checkValues.map((value, checkValueIndex) => {
                    return (
                        <Checkbox 
                            size='sm' 
                            key={checkValueIndex}
                            //onChange={this.handleCheckChange(checkValueIndex)}
                            onChange={(e) => this.handleCheckChange(checkValueIndex, e)}
                        >
                            <InputGroup w='80' size='sm'>
                                <InputLeftElement>
                                    <Box bg='#733D47' w='5' textAlign='center' color='white' borderRadius='sm'>
                                        {String.fromCharCode(65 + parseInt(checkValueIndex))}
                                    </Box>
                                </InputLeftElement>
                                <InputRightElement  color='#BF9B9B'>
                                    <IoCloseCircleSharp
                                        size='22'
                                        onClick={() => {
                                            if (checkValueIndex > -1) {
                                                checkValues.splice(checkValueIndex, 1);
                                            }
                                            this.setState({
                                                ...this.state,
                                                checkValues
                                            })
                                        }} 
                                    />
                                </InputRightElement>
                                {!this.state.checkValuesShow[checkValueIndex] && (<Input 
                                    size='sm'
                                    value={this.state.newCheckValue}
                                    placeholder='Add option..'
                                    variant='outline' w='80'
                                    value={value}
                                    readOnly
                                />)}
                                {this.state.checkValuesShow[checkValueIndex] && (<Input 
                                    size='sm'
                                    value={this.state.newCheckValue}
                                    placeholder='Add option..'
                                    variant='outline' w='80'
                                    value={value}
                                    readOnly
                                    backgroundColor='#F2D8D5'
                                />)}
                            </InputGroup>
                        </Checkbox>
                    )
                })}
            </Stack>
            <Input 
                size='sm' ml='7' mt='2' 
                placeholder='Add option..' variant='outline' w='80'
                onChange={this.handleNewCheckValueChange}
                onKeyDown={this.handleKeyDownForCheck}
                value={this.state.newCheckValue}
                fontWeight='thin'
            />
        </>
    )
  }

  renderParagraph = () => {
    return (
        <>
            <Textarea
                bg='#F2D8D5'
                mt='2'
                placeholder='Paragraph'
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
            <Divider borderColor='#733D47' orientation='horizontal' mb='10' mt='2'/>
            {/* <FilePond
                bg='#F2D8D5 !important'
                allowMultiple={true}
                maxParallelUploads={5}
                name='images'
            /> */}
            <Text 
                fontSize='32'
                fontWeight='light'
                textAlign='center'
                color='#BF9B9B'
            >File Upload</Text>
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
        //console.log('inside mand num change', event.target.value)
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
                    type: 'single',
                    radioValues: [],
                    checkValues: [],
                    radioValuesShow: [],
                    checkValuesShow: []
                }
                mandatory.push(object)
            }
        }
        if(mandatory.length>0) {
            boxHeight = 240 + 270*mandatory.length
            boxHeight = boxHeight.toString()
        } else {
            boxHeight='270px'
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
        //console.log('inside handleMandQuestionChange');
        console.log(event.target.name);
        console.log(event.target.value);
        let mandatoryArray = this.state.mandatory;
        mandatoryArray[event.target.name].question = event.target.value;
        //console.log('mandatoryArray', mandatoryArray)
        // let name = event.target.name;
        // let value = event.target.value;
        this.setState({
            ...this.state,
            mandatory: mandatoryArray
        })
    }

    renderButtonGroup = () => {
        //console.log('inside renderBButtonGroup in child', this.state.sectionIndex);
        let questionIndex = this.state.questionIndex;
        let sectionIndex = this.state.sectionIndex;
        return (
            <>
                {!this.state.isMobile && (
                    <Box bg='#733D47' w='10' h='210' ml='470' borderRadius='lg'>
                    <VStack mt='2' spacing='5'>
                            <AiFillPlusCircle
                                size='22'
                                color='#F2D8D5'
                                onClick={() => this.props.addQuestion(sectionIndex, questionIndex)} 
                            />
                            <IoMdImage
                                size='22'
                                color='#F2D8D5'
                            />
                            <AiFillCopy
                                size='22'
                                color='#F2D8D5'
                                onClick={() => this.props.cloneQuestion(sectionIndex, questionIndex)} 
                            />
                            <FaTrash
                                size='22'
                                color='#F2D8D5'
                                onClick={() => this.props.deleteQuestion(sectionIndex, questionIndex)}
                            />
                            <RiSpotifyLine
                                size='22'
                                color='#F2D8D5' 
                                onClick={() => this.props.addNewSection(sectionIndex, questionIndex)}
                            />
                    </VStack>
                </Box>
                )}
                {this.state.isMobile && (
                    <Box bg='#733D47' w='10' h='210' ml='630' mt='7' borderRadius='lg'>
                    <VStack mt='2' spacing='5'>
                            <AiFillPlusCircle
                                size='22'
                                color='#F2D8D5'
                                onClick={() => this.props.addQuestion(sectionIndex, questionIndex)} 
                            />
                            <IoMdImage
                                size='22'
                                color='#F2D8D5'
                            />
                            <AiFillCopy
                                size='22'
                                color='#F2D8D5'
                                onClick={() => this.props.cloneQuestion(sectionIndex, questionIndex)} 
                            />
                            <FaTrash
                                size='22'
                                color='#F2D8D5'
                                onClick={() => this.props.deleteQuestion(sectionIndex, questionIndex)}
                            />
                            <RiSpotifyLine
                                size='22'
                                color='#F2D8D5' 
                                onClick={() => this.props.addNewSection(sectionIndex, questionIndex)}
                            />
                    </VStack>
                </Box>
                )}
            </>
        )
    }

    handleQuestionClick = () => {
        this.renderButtonGroup()
    }

  render() {
    console.log('state in question', this.state)
    return (
        <>
        <Box onClick={() => this.setState({
            ...this.state,
            renderButtonGroup: true
        })} p='6' 
        borderWidth='1px' boxShadow='base' borderRadius='lg' overflow='hidden' 
        w='5xl' mb='2'
        >
            <SimpleGrid columns={3} spacing={10}>
                <Box height={this.state.boxHeight}>
                <Stack>
                    <FormControl mt='2'>
                        <Select placeholder='Select Question Type'
                            color='#733D47'
                            variant='filled'
                            bg='#F2D8D5'
                            value={this.state.selectedQuestionType}
                            onChange={this.handleQuestionTypeChange}
                            size='sm' variant='filled' w='40'
                        >
                            <option value='single'>Single</option>
                            <option value='multiple'>Multiple</option>
                            <option value='paragraph'>Paragraph</option>
                            <option value='upload'>File Upload</option>
                        </Select>
                        <FormHelperText mt='4' color='#733D47' fontSize='12'>Total marks</FormHelperText>
                        <InputGroup w='40' size='sm' borderColor='#733D47'>
                            <InputRightElement
                                color='#BF9B9B'
                                mr='2'
                                pointerEvents='none'
                                children='marks'
                            />
                            <Input 
                                placeholder='enter marks' 
                                textAlign='center' 
                                value={this.state.totalMarks} 
                                color='#733D47'
                                onChange={this.handleTotalMarksChange}
                            />
                        </InputGroup>

                        <FormHelperText color='#733D47' fontSize='12'>Negative marks</FormHelperText>
                        <InputGroup w='40' size='sm' borderColor='#733D47'>
                            <InputRightElement
                                color='#BF9B9B'
                                mr='2'
                                pointerEvents='none'
                                children='marks'
                            />
                            <Input 
                                placeholder='enter marks' 
                                textAlign='center' 
                                value={this.state.negativeMarks} 
                                color='#733D47'
                                onChange={this.handleNegativeMarksChange}
                            />
                        </InputGroup>
                        {this.state.isMandatoryGiven && (
                            <>
                                <FormHelperText fontSize='12.5' mt='2' color='#733D47'>Number of questions mandatory to attempt</FormHelperText>
                                <InputGroup w='40' size='sm' borderColor='#733D47'>
                                    <InputRightElement
                                        color='#BF9B9B'
                                        mr='5'
                                        pointerEvents='none'
                                        children='questions'
                                    />
                                    <Input 
                                        placeholder='enter number' 
                                        textAlign='center' 
                                        value={this.state.mandatory.length} 
                                        color='#733D47'
                                        onChange={this.handleMandatoryNumberChange}
                                    />
                                </InputGroup>
                            </>
                        )}
                        <br/>
                        <Button size='md' color='#733D47' leftIcon={<IoMdAddCircle/>} variant='ghost'>
                            Add Optional
                        </Button>
                    </FormControl>
                </Stack>
                </Box>
                <Divider ml='-30' borderColor='black' orientation='vertical' />
                <Box height={this.state.boxHeight} ml='-310' overflowY='scroll'>
                    <FormControl>
                        <Input
                            color='#733D47'
                            size='sm'
                            fontWeight='medium'
                            placeholder='Type your question here..'
                            value={this.state.question} 
                            onChange={this.handleQuestionChange}
                            variant='unstyled'
                        />
                        {this.state.selectedQuestionType==='single' && this.renderSingleChoice(this.state.radioValues)}
                        {this.state.selectedQuestionType==='multiple' && this.renderMultipleChoice(this.state.checkValues)}
                        {this.state.selectedQuestionType==='paragraph' && this.renderParagraph()}
                        {this.state.selectedQuestionType==='upload' && this.renderFileUpload()}

                        {this.state.mandatory.length>0 && this.state.mandatory.map((mand, mandKey) => {
                            if(mand.type==='single') {
                                return (
                                    <>
                                        <Text
                                            fontSize='24' fontWeight='thin' textAlign='center' mt='2' color='#BF9B9B'
                                        >OR</Text>
                                        <Input 
                                            size='sm' 
                                            placeholder='Enter question'
                                            name={mandKey}
                                            value={this.state.mandatory[mandKey].question} 
                                            onChange={this.handleMandQuestionChange}
                                            variant='unstyled'
                                            fontWeight='medium'
                                            color='#733D47'
                                        />
                                        {this.renderSingleChoice(this.state.mandatory[mandKey].radioValues)}
                                    </>
                                )
                            } else if(mand.type==='multiple') {
                                return (
                                    <>
                                        <Text
                                            fontSize='24' fontWeight='thin' textAlign='center' mt='2' color='#BF9B9B'
                                        >OR</Text>
                                        <Input
                                            key={mandKey}
                                            size='sm' 
                                            placeholder='Enter question'
                                            value={this.state.mandatory[mandKey].question} 
                                            onChange={this.handleQuestionChange}
                                            variant='unstyled'
                                            fontWeight='medium'
                                            color='#733D47'
                                        />

                                        {this.renderMultipleChoice(this.state.mandatory[mandKey].checkValues)}
                                    </>      
                                )
                            } else if(mand.type==='paragraph') {
                                return (
                                    <>
                                        <Text
                                            fontSize='20' fontWeight='thin' textAlign='center' mt='2' color='#BF9B9B'
                                        >OR</Text>
                                        <Input 
                                            size='sm' 
                                            placeholder='Enter question'
                                            value={this.state.mandatory[mandKey].question} 
                                            onChange={this.handleQuestionChange}
                                            variant='unstyled'
                                            readOnly
                                        />
                                        {this.renderParagraph()}
                                    </>         
                                )
                            } else if(mand.type==='upload') {
                                return (
                                    <>
                                        <Text
                                            fontSize='24' fontWeight='thin' textAlign='center' mt='2' color='#BF9B9B'
                                        >OR</Text>
                                        <Input 
                                            size='sm' 
                                            placeholder='Enter question'
                                            value={this.state.mandatory[mandKey].question} 
                                            onChange={this.handleQuestionChange}
                                            variant='unstyled'
                                            readOnly
                                        />
                                        {this.renderFileUpload()}
                                    </>         
                                )
                            }
                        })}
                    </FormControl>
                </Box>
            </SimpleGrid>
        </Box>
        {this.state.renderButtonGroup && (this.renderButtonGroup())}
        {!this.state.renderButtonGroup && <br />}
        </>
    );
  }
}

export default QuestionPage;
