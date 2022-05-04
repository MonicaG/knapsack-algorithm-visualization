import './App.css';
import React, { useReducer, useState } from "react";
import SetupScreen from './components/SetupScreen';
import { capacityDefaults } from './models/ValueDefaults';
import SolutionController from './components/solution/SolutionController';
import Item from './models/Item';
import KnapsackAlgorithm from './models/KnapsackAlgorithm'
import { CameraIcon } from '@heroicons/react/solid';
import hero from './assets/hero.png';
import twitter from './assets/twitter-blue.svg';
import github from './assets/github.png';
import menu from './assets/menu.svg';

const actionTypes = {
  calculate: 1,
  reset: 2,
}

function App() {

  const initItems = [
    new Item('item 1', 4, 2),
    new Item('item 2', 3, 1),
    new Item('item 3', 5, 3),
    // new Item('item 1', 49.9, 2),
    // new Item('item 2', 3, 1),
    // new Item('item 3', 37.8, 3),
    // new Item('item 4', 21, 1),
    // new Item('item 5', 11.3, 1),
    // new Item('item 6', 4, 2),
    // new Item('item 7', 5, 5),
    // new Item('item 8', 3, 7),
    // new Item('item 9', 1, 1),
    // new Item('item 10', 15, 9),
  ];


  const initialState = {
    capacity: capacityDefaults.defaultValue,
    items: initItems,
    knapsack: null,
    showEntryForm: true,
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  const [showHeaderMenuItems, setShowHeaderMenuItems] = useState(false);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
    });
  }

  function reducer(state, action) {
    switch (action.type) {
      case actionTypes.calculate:
        scrollToTop();
        return {
          ...state,
          items: action.items,
          capacity: action.capacityValue,
          knapsack: new KnapsackAlgorithm(action.items, action.capacityValue),
          showEntryForm: false,
        };
      case actionTypes.reset:
        scrollToTop();
        return {
          ...state,
          showEntryForm: true,
        };
      default:
        //@todo should default do something else?
        throw new Error();
    }
  }

  function menuBtnClick() {
    setShowHeaderMenuItems(!showHeaderMenuItems)
  }

  return (
    <div>
      <div className="sm:bg-gradient-to-br sm:from-slate-50 sm:to-slate-200 bg-slate-100">
        <header>
          <nav className="bg-gradient-to-b from-navbar-from via-navbar-via to-navbar-to flex flex-wrap px-4 py-2 md:py-0 border border-navbar-border items-center justify-between w-full">
            <div className="justify-self-start logo navbar-font"><a href="/">Monica Granbois</a></div>
            <button onClick={() => menuBtnClick()} className="navbar-toggler">
              <img className="navbar-toggler-icon" src={menu} alt="navigation menu" />
            </button>
            <div className={`w-full md:flex md:items-center md:w-auto ${showHeaderMenuItems ? "" : "hidden"}`}>
              <ul className="md:flex md:justify-between">
                <li><a className="navbar-link" href="/">Home</a></li>
                <li><a className="navbar-link" href="/about/">About</a></li>
                <li><a className="navbar-link" href="/projects/">Projects</a></li>
                <li><a className="navbar-link" href="/feed.xml">RSS</a></li>
              </ul>
            </div>
          </nav>
        </header>
        <div className="rounded">
          <div className="flex justify-center gap-x-2">
            <div className="ml-4 px-2 md:py-4 md:px-4"><img className="object-contain h-48" src={hero} alt="Drawing of an orange backpack with yellow straps." /></div>
            <div className="self-center text-4xl md:text-6xl text-[#BF392C]">Knapsack Algorithm Visualization</div>
          </div>
          <div className="p-2">
            <div className="border bg-white p-6 md:max-w-2xl 2xl:max-w-4xl md:mx-auto rounded-lg">

              {state.showEntryForm ?
                <SetupScreen
                  items={state.items}
                  dispatch={dispatch}
                />
                :
                <div>
                  <SolutionController
                    knapsackAlgorithm={state.knapsack}
                    appDispatch={dispatch}
                  />
                </div>
              }
            </div>
          </div>
        </div>
        <div className="flex place-content-center bg-white my-4">
          <div className="grid grid-cols-2 gap-y-2 gap-x-0 w-fit text-xs justify-items-center mt-2">
            <div>
              <div className="flex items-center">
                <img className="h-4" src={github} alt="github logo" />
                <span className="mx-1"><a href="https://github.com/MonicaG" className="link">MonicaG</a></span>
              </div>
            </div>
            <div>
              <div className="flex items-center">
                <img className="h-4" src={twitter} alt="twitter logo" />
                <span className="mx-1"><a href="https://twitter.com/mgranbois" className="link">@mgranbois</a></span>
              </div>
            </div>
            <div className="col-span-2 ">
              <div className="flex items-center">
                <CameraIcon className="h-5" /><span className="mx-1"><a href="https://icon-icons.com/icon/backpack-bag/54417" className="link">Nick Frost and Greg Lapin</a> on <a href="https://icon-icons.com/" className="link">icons-icons</a></span>
              </div>
            </div>
            <div className="col-span-2 ">
              <p>&copy; 2022</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
export { actionTypes };
