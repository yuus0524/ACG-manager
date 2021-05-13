import React, {useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles';
import { ImCheckboxUnchecked, ImCheckboxChecked } from 'react-icons/im'
import { AiOutlineEdit } from 'react-icons/ai'
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(() => ({
  removeAllBt: {
    marginLeft: 10,
    minWidth: 230,
    height: 40,
  }
}));

const SearchAndButtton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const SearchForm = styled.input`
  font-size: 20px;
  width: 100%;
  height: 40px;
  margin: 10px 0;
  padding: 10px;
`

const TodoName = styled.span`
  font-size: 27px;
  ${({ is_completed }) => is_completed && `
    opacity: 0.4;
  `}
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 7px auto;
  padding: 10px;
  font-size: 25px;
`

const CheckedBox = styled.div`
  display: flex;
  align-items: center;
  margin: 0 7px;
  color: green;
  cursor: pointer;
`

const UncheckedBox = styled.div`
  display: flex;
  align-items: center;
  margin: 0 7px;
  cursor: pointer;
`

const EditButton = styled.span`
  display: flex;
  align-items: center;
  margin: 0 7px;
`

function TodoListAnime() {
  const classes = useStyles();

  const [todos, setTodos] = useState([])
  const [searchName, setSearchName] = useState('')

  const filterByCategory = item => {
    if (item.category === "アニメ") {
      return true;
    }
    return false;
  };

  useEffect(() => {
    axios.get('/api/v1/todos.json')
    .then(response => {
      setTodos(response.data.filter(filterByCategory));
    })
    .catch(e => {
      console.log(e);
    })
  }, [])

  const removeTodosAnime = () => {
    const sure = window.confirm('本当にアニメのTodoを全て削除していいですか？');
    if (sure) {
      axios.delete('/api/v1/todos/destroy_anime')
      .then(response => {
        setTodos([])
      })
      .catch(e => {
        console.log(e)
      })
    }
  }

  const updateIsCompleted = (index, val) => {
    let data = {
      id: val.id,
      name: val.name,
      is_completed: !val.is_completed,
      category: val.category
    }
    axios.patch(`/api/v1/todos/${val.id}`, data)
    .then(resp => {
      const newTodos = [...todos]
      newTodos[index].is_completed = resp.data.is_completed
      setTodos(newTodos)
    })
  }

  return (
    <>
      <h1>Todo Anime</h1>
      <SearchAndButtton>
        <SearchForm
          type="text"
          placeholder="Search todo..."
          onChange={event => {
            setSearchName(event.target.value)
          }}
        />
        <Button
          className={classes.removeAllBt}
          variant="contained"
          color="secondary"
          endIcon={<DeleteIcon />}
          onClick={removeTodosAnime}
        >
           アニメのTodoを全て削除
        </Button>
      </SearchAndButtton>

      <div>
        {todos.filter((val) => {
          if(searchName === "") {
            return val
          } else if (val.name.toLowerCase().includes(searchName.toLowerCase())) {
            return val
          }
        }).map((val, key) => {
          return (
            <Row key={key}>
              {val.is_completed ? (
                <CheckedBox>
                  <ImCheckboxChecked onClick={() => updateIsCompleted(key, val) } />
                </CheckedBox>
              ) : (
                <UncheckedBox>
                  <ImCheckboxUnchecked onClick={() => updateIsCompleted(key, val) } />
                </UncheckedBox>
              )}
              <TodoName is_completed={val.is_completed}>
                {val.name}
              </TodoName>
              <Link to={"/todos/" + val.id + "/edit"}>
                <EditButton>
                  <AiOutlineEdit />
                </EditButton>
              </Link>
            </Row>
          )
        })}
      </div>
    </>
  )
}

export default TodoListAnime