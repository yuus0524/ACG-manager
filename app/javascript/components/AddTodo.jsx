import React, { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import SendIcon from '@material-ui/icons/Send';
import FormControl from '@material-ui/core/FormControl';


const useStyles = makeStyles((theme) => ({
  button: {
    marginLeft: 10,
    marginTop: 8,
    minWidth: 80,
    height: 56,
    "&$disabled": {
      opacity: 0.5,
      cursor: "default",
    }
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  disabled: "{ disabled }"
}));

const InputAndButton = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`
const InputName = styled.input`
  font-size: 20px;
  width: 100%;
  height: 50px;
  padding: 2px 7px;
  margin-right: 10px;
  margin-top: 10px;
`

toast.configure()

function AddTodo(props) {
  const classes = useStyles();

  const [id, setId] = useState(null),
        [name, setName] = useState(""),
        [is_completed, setIsCompleted] = useState(false),
        [category, setCategory] = useState("アニメ");

  const handleInputChange = (event) => {
    setName(event.target.value)
  }

  const handleCategoryChange = (event) => {
    setCategory(event.target.value)
  }

  const notify = () => {
    toast.success('新規投稿が完了しました!', {
      position: 'bottom-center',
      hideProgressBar: true
    })
  }

  const saveTodo = () => {
    let data = {
      id: id,
      name: name,
      is_completed: is_completed,
      category: category
    }

    axios.post('/api/v1/todos', data)
    .then(response => {
      setId({ id: response.data.id })
      setName({ name: response.data.name })
      setIsCompleted({ is_completed: response.data.is_completed })
      setCategory({ category: response.data.category })
      notify()
      props.history.push('/todos')
    })
    .catch(e => {
      console.log(e)
    })
  };
  return (
    <>
      <h1>New Todo</h1>
      <InputAndButton>
        <InputName 
          type="text"
          required
          value={name}
          name="name"
          onChange={handleInputChange}
        />
        <FormControl variant="filled" className={classes.formControl}>
          <InputLabel htmlFor="filled-age-native-simple">カテゴリー</InputLabel>
          <Select
            value={category}
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
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          endIcon={<SendIcon />}
          onClick={saveTodo}
          disabled={(!name || /^\s*$/.test(name))}
        >
          Send
        </Button>
      </InputAndButton>
    </>
  )
}

export default AddTodo
