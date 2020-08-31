import React, { Component } from 'react';

import Header from '../Header';
import Filter from '../Filter';
import SearchPanel from '../SearchPanel';
import TodoList from '../TodoList';
import AddTodoItem from '../AddTodoItem';

import './app.css';

export default class App extends Component {

  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem('Drink coffee'),
      this.createTodoItem('Make React App'),
      this.createTodoItem('Drink beer'),
    ],
    inputValue: '',
  }

  searchTodoItem(arrItems, item) {
    if (item.length === 0) {
      return arrItems;
    }

    return arrItems.filter((el) => {
      return el.label.indexOf(item) > -1;
    })
  }

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    }
  }

  findIndex(array, id) {
    return array.findIndex((el) => el.id === id)
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idDel = this.findIndex(todoData, id)

      const newData = [
        ...todoData.slice(0, idDel), 
        ...todoData.slice(idDel + 1)
      ];

      return {
        todoData: newData
      }
    });
  };

  addItem = (label) => {
    const newTodoItem = this.createTodoItem(label)

    this.setState(({ todoData }) => {
      const newData = [
        ...todoData,
        newTodoItem
      ];

      return {
        todoData: newData
      }
    });
  }

  toggleProperty(arr, id, propName) {
    const curId = this.findIndex(arr, id);

    const oldItem = arr[curId];
    const newItem = {...oldItem, [propName]: !oldItem[propName]};

    return [
      ...arr.slice(0, curId),
      newItem,
      ...arr.slice(curId + 1)
    ];
  }

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      }
    })
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      }
    })
  };

  onSearchChange = (inputValue) => {
    this.setState({ inputValue });
  }

  render() {

    const { todoData, inputValue } = this.state;

    const visibleItem = this.searchTodoItem(todoData, inputValue)

    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <div className='todo-app'>
        <Header toDo={todoCount} done={doneCount}/>

        <div className='top-panel d-flex'>
          <SearchPanel 
            onSearchChange={this.onSearchChange}/>

          <Filter />
        </div>

        <TodoList 
          todoS={visibleItem}
          onDeleted={ this.deleteItem }
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}/>

          <AddTodoItem onAddItemClick={this.addItem}/>
    </div>
    )
  }
}
