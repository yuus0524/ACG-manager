import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import styled from 'styled-components'
import { AddTodo, TodoList, EditTodo } from './index'
import './App.css'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles((theme) => ({
  bt: {
    color: "white",
    borderColor: "white",
    '&:hover': {
      color: "yellow",
      borderColor: "yellow"
    }
  },

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
  height: calc(100vh - 40px - 100px - 48px);
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

  return (
    <Wrapper>
      <Nabvar>
        <Logo>
          ACG-manager
        </Logo>
        <Link to="/todos/new">
          <Button className={classes.bt} variant="outlined" color="primary">
            Todoを追加する
          </Button>
        </Link>
      </Nabvar>
      <Contents>
        <Switch>
          <Route exact path="/todos" component={TodoList} />
          <Route exact path="/todos/new" component={AddTodo} />
          <Route path="/todos/:id/edit" component={EditTodo} />
        </Switch>
      </Contents>
      <Paper>
        <Link to="/todos">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="アニメ" />
            <Tab label="マンガ" />
            <Tab label="ゲーム" />
          </Tabs>
        </Link>
      </Paper>
    </Wrapper>
  )
}

export default App
