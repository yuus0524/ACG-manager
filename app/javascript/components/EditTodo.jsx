import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import UpdateIcon from '@material-ui/icons/Update';
import DeleteIcon from '@material-ui/icons/Delete';
import SendIcon from '@material-ui/icons/Send';


const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 160,
    marginLeft: 50,
  },
  isCompletedBt: {
    minWidth: 120,
    marginTop: 10
  },
  updateBt: {
    minWidth: 120,
    marginLeft: 5,
    marginTop: 10
  },
  deleteBt: {
    minWidth: 120,
    marginLeft: 5,
    marginTop: 10
  }
}));

const InputName = styled.input`
  font-size: 20px;
  width: 100%;
  height: 50px;
  padding: 2px 7px;
  margin: 10px 0px 40px 0px;
`

const CurrentStatus = styled.div`
  font-size: 18px;
  margin: 8px 0 12px 12px;
  font-weight: bold;
`
toast.configure()

function EditTodo(props) {
  const classes = useStyles();

  const [currentId, setCurrentId] = useState(null),
        [currentName, setCurrentName] = useState(""),
        [currentIsCompleted, setCurrentIsCompleted] = useState(false),
        [currentCategory, setCurrentCategory] = useState("アニメ");

  const getTodo = id => {
    axios.get(`/api/v1/todos/${id}`)
    .then(response => {
      setCurrentId(response.data.id)
      setCurrentName(response.data.name)
      setCurrentIsCompleted(response.data.is_completed)
      setCurrentCategory(response.data.category)
    })
    .catch(e => {
      console.log(e)
    })
  }

  useEffect(() => {
    getTodo(props.match.params.id)
  }, [props.match.params.id])

  const handleInputChange = (event) => {
    setCurrentName(event.target.value)
  }

  const handleCategoryChange = (event) => {
    setCurrentCategory(event.target.value)
  }

  const updateIsCompleted = () => {
    let data = {
      id: currentId,
      name: currentName,
      is_completed: !currentIsCompleted,
      category: currentCategory
    }
    axios.patch(`/api/v1/todos/${currentId}`, data)
    .then(response => {
      setCurrentIsCompleted(response.data.is_completed)
    })
  }

  const notify = () => {
    toast.success('Todoの更新が完了しました!', {
      position: 'bottom-center',
      hideProgressBar: true
    })
  }

  const updateTodo = () => {
    let data = {
      id: currentId,
      name: currentName,
      is_completed: currentIsCompleted,
      category: currentCategory
    }
    axios.patch(`/api/v1/todos/${currentId}`, data)
    .then(response => {
      notify()
      props.history.push('/todos')
    })
    .catch(e => {
      console.log(e)
    })
  }

  const deleteTodo = () => {
    const sure = window.confirm('本当に削除していいですか？')
    if (sure) {
      axios.delete(`/api/v1/todos/${currentId}`)
      .then(response => {
        props.history.push('/todos')
      })
      .catch(e => {
        console.log(e)
      })
    }
  }

  return (
    <>
      <h1>Editing Todo</h1>
      <div>
        <div>
          <label htmlFor="name">コンテンツ名</label>
          <InputName 
            type="text"
            name="name"
            value={currentName}
            onChange={handleInputChange}
          />
          <div>
            <span>現在の状態</span>
            <CurrentStatus>
              {currentIsCompleted ? "完了" : "未完了"}
            </CurrentStatus>
          </div>
        </div>
        {currentIsCompleted ? (
          <Button
            className={classes.isCompletedBt}
            variant="contained"
            endIcon={<UpdateIcon />}
            onClick={() => updateIsCompleted(currentIsCompleted)}
          >
            未完了
          </Button>
        ) : (
          <Button
            className={classes.isCompletedBt}
            variant="contained"
            endIcon={<UpdateIcon />}
            onClick={() => updateIsCompleted(currentIsCompleted)}
          >
            完了
          </Button>
        )}
        <Button
          className={classes.updateBt}
          variant="contained"
          color="primary"
          type="submit"
          endIcon={<SendIcon />}
          onClick={updateTodo}
        >
          更新
        </Button>
        <Button
          className={classes.deleteBt}
          variant="contained"
          color="secondary"
          endIcon={<DeleteIcon />}
          onClick={deleteTodo}
        >
          削除
        </Button>
        <FormControl variant="filled" className={classes.formControl}>
          <InputLabel htmlFor="filled-age-native-simple">カテゴリー</InputLabel>
          <Select
            required
            value={currentCategory}
            onChange={handleCategoryChange}
            inputProps={{
              name: 'category',
              id: 'filled-age-native-simple',
            }}
          >
            <MenuItem value={"アニメ"}>アニメ</MenuItem>
            <MenuItem value={"マンガ"}>マンガ</MenuItem>
            <MenuItem value={"ゲーム"}>ゲーム</MenuItem>
          </Select>
        </FormControl>
      </div>
    </>
  )
}

export default EditTodo
