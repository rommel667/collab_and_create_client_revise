import React from 'react'
import { useSelector } from 'react-redux';
import HomePage from './components/HomePage'
import Layout from './components/Layout';
import Main from './components/Main';

const App = () => {

  const { user } = useSelector(state => state.user)

  return (
    <div className="bg-gray-50">
      <Layout user={user}>
        <HomePage user={user} />
        {user && <Main user={user} />}
      </Layout>

    </div>
  );
}

export default App;
