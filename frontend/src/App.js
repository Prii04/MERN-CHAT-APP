// App.js
import { ChakraProvider , defaultSystem} from '@chakra-ui/react'
import Homepage from "./Pages/HomePage"; // Import the HomePage component

function App() {
  return (
    <ChakraProvider value={defaultSystem}>
      <div className="App">
        <Homepage />
      </div>
    </ChakraProvider>
  );
}

export default App;