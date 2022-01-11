import { Flex, VStack, Heading} from "@chakra-ui/layout";
import { Component } from 'react'

class SectionPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  render() {
        return (
            <VStack p={5}>
                <Flex w="100%">
                    <Heading ml="20" fontSize="2xl" fontWeight='semibold'>Edvora</Heading>
                </Flex>
            </VStack>
        );
    }
}

export default SectionPage;
