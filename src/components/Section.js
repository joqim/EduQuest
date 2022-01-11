import { Box, Checkbox, Text} from '@chakra-ui/react'
import { Component } from 'react'

class SectionPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  render() {
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
                Section Name
                </Box>

                <Box>
                Description
                <Box as='span' color='gray.600' fontSize='sm'>
                    &nbsp; (optional)
                </Box>
                </Box>
            </Box>
          <Box m='5' as='span' color='gray.600' fontSize='sm'>
            <Checkbox mb='3'>
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
