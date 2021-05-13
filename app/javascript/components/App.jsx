import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import styled from 'styled-components'
import { AddTodo, TodoList, TodoListAnime, TodoListComic, TodoListGame, EditTodo } from './index'
import './App.css'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  bt: {
    color: "white",
    borderColor: "white",
    '&:hover': {
      color: "yellow",
      borderColor: "yellow"
    }
  },

  tab: {
    height: 65,
  }
}));

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  background-color: #D7EEFF;
  `

  const Nabvar = styled.nav`
  background: #004400;
  min-height: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const Logo = styled.div`
  font-weight: bold;
  color: white;
  font-size: 23px;
  letter-spacing: 2px;
`

const Contents = styled.div`
  height: calc(100vh - 40px - 100px - 65px);
  width: 700px;
  max-width: 85%;
  margin: 20px auto;
`

function App() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const history = useHistory();
  const handleLink = path => history.push(path);

  return (
    <Wrapper>
      <Nabvar>
        <Logo>
          ACG-manager
        </Logo>
        <Link to="/todos">
          <Button className={classes.bt} variant="outlined" color="primary">
            Todo一覧
          </Button>
        </Link>
        <Link to="/todos/new">
          <Button className={classes.bt} variant="outlined" color="primary">
            Todoを追加する
          </Button>
        </Link>
      </Nabvar>
      <Contents>
        <Switch>
          <Route exact path="/todos" component={TodoList} />
          <Route exact path="/todos/anime" component={TodoListAnime} />
          <Route exact path="/todos/comic" component={TodoListComic} />
          <Route exact path="/todos/game" component={TodoListGame} />
          <Route exact path="/todos/new" component={AddTodo} />
          <Route path="/todos/:id/edit" component={EditTodo} />
        </Switch>
      </Contents>
      <Paper className={classes.tab}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab onClick={() => handleLink('/todos/anime')} label="アニメ" />
            <Tab onClick={() => handleLink('/todos/comic')} label="マンガ" />
            <Tab onClick={() => handleLink('/todos/game')} label="ゲーム" />
          </Tabs>
      </Paper>
    </Wrapper>
  )
}

export default App
