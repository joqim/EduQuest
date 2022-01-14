import { Box, Checkbox, Text, Input} from '@chakra-ui/react'
import { Component } from 'react'
import '../css/style.css'

class SectionPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      shuffle: false,
      sectionIndex: null
    }
  }

  componentDidMount = () => {
    //console.log('inside section comp did mount' , this.props.sectionIndex)
    let props = this.props.sectionValues;
    this.setState({
      ...this.state,
      name: props.name,
      description: props.description,
      shuffle: props.shuffle,
      sectionIndex: this.props.sectionIndex
    })
  }

  componentWillReceiveProps = (nextProps) => {
    //console.log('props inside componentWillReceiveProps', nextProps.sectionValues.name, nextProps.sectionIndex)
    let newProps = nextProps.sectionValues
    // if(newProps.name && newProps.description && newProps.shuffle) {
      //console.log('setting state for', nextProps.sectionIndex, 'as', newProps.name)
      this.setState({
        ...this.state,
        name: newProps.name,
        description: newProps.description,
        shuffle: newProps.shuffle,
        sectionIndex: nextProps.sectionIndex
      })
    // }
  }

  handleSectionNameChange = (event) => {
    this.setState({
      ...this.state,
      name: event.target.value
    })
  }

  handleSectionDescriptionChange = (event) => {
    this.setState({
      ...this.state,
      description: event.target.value
    })
  }

  handleSectionShuffleChange = (event) => {
    this.setState({
      ...this.state,
      shuffle: event.target.checked
    })
  }

  render() {
    console.log('state in section', this.state, 'section Index', this.state.sectionIndex)
    return (
        <Box borderWidth='1px' boxShadow='base' borderRadius='lg' overflow='hidden' w='5xl'>
          <Box p='6' pt='3' ml='5'>
            <Box
            mt='1'
            fontWeight='semibold'
            as='h4'
            lineHeight='tight'
            isTruncated
            >
              <Input
                fontSize='2xl'
                variant='unstyled' 
                placeholder='Section Name' 
                value={this.state.name}
                onChange={this.handleSectionNameChange}
              />
              </Box>

              <Box color='gray.600'>
                <Input 
                  variant='unstyled' 
                  placeholder='Description(optional)' 
                  value={this.state.description}
                  onChange={this.handleSectionDescriptionChange}
                />
              </Box>
            </Box>
          <Box m='5' as='span' color='gray.600' fontSize='sm'>
            <Checkbox 
              borderColor='#733D47' 
              colorScheme='green' 
              mb='3' 
              checked={this.state.shuffle} 
              onChange={this.handleSectionShuffleChange}
              >
              <Text color='#733D47' fontSize='sm'>
                Shuffle Questions
              </Text>
            </Checkbox>
          </Box>
        </Box>
    );
  }
}

export default SectionPage;
