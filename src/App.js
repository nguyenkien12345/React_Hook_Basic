import React, {useState,useEffect} from 'react';
import './App.scss';
import Clock from './Components/Clock';
import ColorBox from './Components/ColorBox';
import Hero from './Components/Hero';
import useMagicColor from './Components/hooks/useMagicColor';
import MagicBox from './Components/MagicBox';
import queryString from 'query-string';
import TodoForm from './Components/TodoForm';
import TodoList from './Components/TodoList';
import PostList from './Components/PostList';
import Pagination from './Components/Pagination';
import PostFiltersForm from './Components/PostFiltersForm';


function App() {
  // const [todoList, setTodoList] = useState 
  // ([
  //   {id: 1, title: "SÚT"},
  //   {id: 2, title: "ĐẤM"},
  //   {id: 3, title: "ĐÁ"},
  // ]);

  // Clock
  // const [showClock, setShowClock] = useState(true);

  // Hero
  // const [count,setCount] = useState(0);
  // const handleHeroClick = () => {}

  // function handleTodoClick(todo){
  //   const index = todoList.findIndex(x => x.id === todo.id);
  //   // Nếu không tìm thấy id thì không làm gì cả
  //   if(index < 0) return;
  //   const newTodoList = [...todoList];
  //   newTodoList.splice(index,1);
  //   setTodoList(newTodoList);
  // }

  // function handleTodoFormSubmit(formValues){
  //   const newTodo = {
  //     id: todoList.length + 3,
  //     // Lấy toàn bộ các dữ liệu còn lại trong form (Giả sử form có nhiều dữ liệu thì ta ...formValues thì nó sẽ lấy toàn bộ những dữ liệu có trong form)
  //     ...formValues
  //   }
  //   const newTodoList = [...todoList];
  //   newTodoList.push(newTodo);
  //   setTodoList(newTodoList);
  // }

  const [postList, setPostList] = useState([]);

  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 1
  });

  const [filters, setFilters] = useState({
    _limit: 10,
    _page: 1,
  });

  // Để ép từ { _limit: 10, _page: 1} về _limit=10&_page=1 ta cần cài npm i --save query-string để làm điều đó
  useEffect(() => {
    async function fetchPostList(){
      try {
        const paramsString = queryString.stringify(filters); //Chuyển từ object sang chuỗi
        // Muốn dùng biến trong url phải dùng template string (``)
        const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${paramsString}`;
        const response = await fetch(requestUrl);
        // Phải parse về json
        const responseJSON = await response.json();
        console.log({responseJSON});
        // Nhờ console.log({responseJSON}) ta lấy được data, pagination từ api trả về
        const {data, pagination} = responseJSON;
        setPostList(data);
        setPagination(pagination);
      } catch (error) {
        console.log("FAILED TO FETCH POST LIST: ", error.message);
      }
    }
    // Nhớ gọi lại chính nó
    fetchPostList();
  }, [filters]);

    function handlePageChange(newPage){
    console.log(newPage);
    setFilters({
      ...filters, //Giữ những cái filter hiện tại
      _page: newPage,
    })
  }

  function handleFiltersChange(newFilters){
    setFilters({
      ...filters, //Giữ những cái filter hiện tại
      _page: 1, //reset về trang đầu tiên để tìm kiếm lại từ đầu
      title_like: newFilters.searchTerm, //Search cái title chứa cái nội dung mình nhập
    });
  }

  // EFFECT chạy theo trình tự. EFFECT nào khai báo trước chạy trước

  return (
    <div className="app">
      <h1>Welcome to React Hooks !</h1>

      {/* Chỉ showClock nếu state ở trạng thái true */}
      {/* {showClock && <Clock/>} */}
      {/* Khi click button thì sẽ ẩn đồng hồ đi tức là component bị unmount */}
      {/* <button onClick = {() => setShowClock(false)}>Hide Clock</button> */}

      {/* <ColorBox/> */}

      {/* <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>Increase</button>
      <Hero name="Nguyễn Trung Kiên" onClick={handleHeroClick}/> */}

      {/* <MagicBox/> */}

      {/* <TodoForm onSubmit={handleTodoFormSubmit}/>
      <TodoList todos={todoList} onTodoClick={handleTodoClick}/> */}

      <PostList posts={postList}/>
      <Pagination pagination={pagination} onPageChange={handlePageChange}/>
      <PostFiltersForm onSubmit={handleFiltersChange}/>
    </div>
  );
}

export default App;
// Lý thuyết
// Khi bạn bạn thay đổi state của 1 app bất kì nào vd: function App(){} toàn bộ thông tin trong cặp ngoặc nhọn {} sẽ được chạy lại 
// tức là những cái hàm trong cặp {} sẽ tự tạo ra object mới. Nghĩa là lần render 2 sẽ tạo ra 1 object mới. Tức là object 2 khác với object 1
