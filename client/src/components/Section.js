import { Box, Checkbox, Text, Input} from '@chakra-ui/react'
import { Component } from 'react'

class SectionPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      shuffle: false
    }
  }

  componentDidMount = () => {
    console.log('inside component did mount - section')
    let props = this.props.sectionValues;
    this.setState({
      ...this.state,
      name: props.name,
      description: props.description,
      shuffle: props.shuffle
    })
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

  getAlert() {
    return this.state;
  }

  render() {
    console.log('props in section', this.props)
    return (
        <Box borderWidth='1px' boxShadow='base' borderRadius='lg' overflow='hidden' w='5xl'>
            <Box p='6' pt='3'>
                <Box
                mt='1'
                fontWeight='semibold'
                as='h4'
                lineHeight='tight'
                isTruncated
                >
                  <Input 
                    variant='unstyled' 
                    placeholder='Enter section name' 
                    value={this.state.name}
                    onChange={this.handleSectionNameChange}
                  />
                </Box>

                <Box color='gray.600'>
                  <Input 
                    variant='unstyled' 
                    placeholder='Enter description name (optional)' 
                    value={this.state.description}
                    onChange={this.handleSectionDescriptionChange}
                  />
                {/* <Box as='span' color='gray.600' fontSize='sm'>
                    &nbsp; (optional)
                </Box> */}
                </Box>
            </Box>
          <Box m='5' as='span' color='gray.600' fontSize='sm'>
            <Checkbox colorScheme='green' mb='3' checked={this.state.shuffle} onChange={this.handleSectionShuffleChange}>
              <Text color='gray.600' fontSize='sm'>
                Shuffle Questions
              </Text>
            </Checkbox>
          </Box>
        </Box>
    );
  }
}

export default SectionPage;
