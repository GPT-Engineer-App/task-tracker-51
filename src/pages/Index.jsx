import { Box, Button, Container, Flex, Heading, IconButton, Input, List, ListItem, Text, useToast, VStack } from "@chakra-ui/react";
import { FaTrash, FaCheck } from "react-icons/fa";
import { useState } from "react";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const toast = useToast();

  const handleAddTask = () => {
    if (input.trim() === "") {
      toast({
        title: "Cannot add empty task.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTasks([...tasks, { id: Date.now(), text: input, isCompleted: false }]);
    setInput("");
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleCompleteTask = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isCompleted: !task.isCompleted } : task));
  };

  return (
    <Container maxW="container.md" p={4}>
      <VStack spacing={8}>
        <Heading size="lg">Todo App</Heading>
        <Flex as="nav">
          <Button mr={4}>Home</Button>
          {/* Future navigation buttons */}
        </Flex>
        <Flex width="100%">
          <Input
            placeholder="Add a new task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
          />
          <Button onClick={handleAddTask} ml={2}>Add</Button>
        </Flex>
        <List width="100%">
          {tasks.map(task => (
            <ListItem key={task.id} display="flex" justifyContent="space-between" alignItems="center" p={2} bg={task.isCompleted ? "green.100" : "gray.100"}>
              <Text as={task.isCompleted ? "s" : ""}>{task.text}</Text>
              <Flex>
                <IconButton icon={<FaCheck />} onClick={() => handleCompleteTask(task.id)} isRound="true" aria-label="Complete Task" m={1} />
                <IconButton icon={<FaTrash />} onClick={() => handleDeleteTask(task.id)} isRound="true" aria-label="Delete Task" m={1} />
              </Flex>
            </ListItem>
          ))}
        </List>
      </VStack>
    </Container>
  );
};

export default Index;