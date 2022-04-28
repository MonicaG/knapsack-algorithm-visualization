import './App.css';
import React, { useReducer } from "react";
import SetupScreen from './components/SetupScreen';
import { capacityDefaults } from './models/ValueDefaults';
import SolutionController from './components/solution/SolutionController';
import Item from './models/Item';
import KnapsackAlgorithm from './models/KnapsackAlgorithm'
import { CameraIcon } from '@heroicons/react/solid';
import hero from './assets/hero.jpg';
import twitter from './assets/twitter-blue.svg';
import github from './assets/github.png';

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

  return (
    <div>
    <div className="sm:bg-gradient-to-br sm:from-slate-50 sm:to-slate-200 bg-slate-100">
    {/* start header */}
      <div className="bg-gradient-to-b from-[#6d94bf] via-[#446e9b] to-[#3e648d] flex py-2 px-4 border border-[#345578] items-center">
        <div className="justify-self-start my-logo my-logo-font"><a href="/">Monica Granbois</a></div>
        <div className="flex-auto flex justify-end">
          <div className="my-logo-font my-logo-links px-2"><a href="/">Home</a></div>
          <div className="my-logo-font my-logo-links px-2"><a href="/about/">About</a></div>
          <div className="my-logo-font my-logo-links px-2"><a href="/projects/">Projects</a></div>
          <div className="my-logo-font my-logo-links px-2"><a href="/feed.xml">RSS</a></div>
          </div>
      </div>
      {/* end header */}
      <div className="rounded">
        <div className="relative mb-2">
          <img className="object-cover h-32 sm:h-72 2xl:h-80 w-full object-center shadow-lg" src={hero} alt="Yellow backpack at the base of a tree." />
          <h1 className="absolute inset-0 z-10 flex justify-center items-center text-white font-bold text-center text-4xl sm:text-6xl ">Knapsack Algorithm Visualization</h1>
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
        <div className="grid grid-cols-2 gap-y-2 gap-x-0 w-fit text-xs justify-items-center">
          <div>
            <div className="flex items-center">
              <img className="h-4" src={github} alt="github logo" />
              <span className="mx-1"><a href="https://github.com/MonicaG" className="link">Monica Granbois</a></span>
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
              <CameraIcon className="h-5" /><span className="mx-1"><a href="https://unsplash.com/@ilypnytskyi" className="link"> Igor Lypnytskyi</a> on <a href="https://unsplash.com/photos/hg_ScY1LFQU?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink" className="link">Unsplash</a></span>
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
