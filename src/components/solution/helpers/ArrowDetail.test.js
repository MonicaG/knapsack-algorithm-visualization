import KnapSackAlgorithm from '../../../models/KnapsackAlgorithm'
import Item from '../../../models/Item';
import ArrowDetail from './ArrowDetail';


// Mock react-xarrows because of this issue: https://github.com/Eliav2/react-xarrows/issues/110 
// Solution from: https://github.com/Eliav2/react-xarrows/issues/110#issuecomment-1142545380
jest.mock('react-xarrows', () => {
  return {
    __esModule: true,
    default: () => <span />,
    useXarrow: () => null,
  };
});

describe('ArrowDetail tests', () => {
  let algorithm = null;
  beforeAll(() => {
    const capacity = 5;
    const item1 = new Item('item 1', 8, 3);
    item1.id = "id1";
    const item2 = new Item('item 2', 5, 1);
    item2.id = "id2";
    const item3 = new Item('item 3', 12, 2);
    item3.id = "id3";
    const items = [item1, item2, item3];

    algorithm = new KnapSackAlgorithm(items, capacity);
  });

  describe('ArrowDetail start cell tests', () => {
    it('will get the start cell when previous cell is the 0 row', () => {
      let ad = new ArrowDetail(algorithm, 1, 1);
      expect(ad.getStartCell()).toBe("Cell1");
    });

    it('will get the cell above it when that cell\'s value is greater than current cell\'s value plus any leftover capacity', () => {
      let ad = new ArrowDetail(algorithm, 2, 3);
      expect(ad.getStartCell()).toBe("id13");
    });

    it('will get the cell above it when the current capacity is less than the item\'s weight', () => {
      let ad = new ArrowDetail(algorithm, 3, 1);
      expect(ad.getStartCell()).toBe("id21");
    });

    it('will get the most valuable cell when current item value plus leftover capacity is greater than the cell above', () => {
      let ad = new ArrowDetail(algorithm, 2, 5);
      expect(ad.getStartCell()).toBe("id14");
    });

    it('will handle non existent start cell', () => {
      let ad = new ArrowDetail(algorithm, 15, 15);
      expect(ad.getStartCell()).toBe("");
    });
  });

  describe('ArrowDetail end cell tests', () => {
    it('will get the end cell', () => {
      let ad = new ArrowDetail(algorithm, 1, 1);
      expect(ad.getEndCell()).toBe("id11");

      ad = new ArrowDetail(algorithm, 2, 3);
      expect(ad.getEndCell()).toBe("id23");

      ad = new ArrowDetail(algorithm, 3, 5);
      expect(ad.getEndCell()).toBe("id35");
    });

    it('will handle non existent end cell', () => {
      let ad = new ArrowDetail(algorithm, 10, 10);
      expect(ad.getEndCell()).toBe("");

    });
  });

  describe('ArrowDetail anchor detail tests', () => {
    it('will get anchor details when winning cell is the cell above', () => {
      let ad = new ArrowDetail(algorithm, 3, 1);
      let anchorDetail = ad.getAnchorDetails();
      expect(anchorDetail.length).toBe(2);
      expect(anchorDetail[0]).toEqual({ position: "middle", offset: { y: 10 } });
      expect(anchorDetail[1]).toEqual({ position: "middle", offset: { y: -10 } });
    });

    it('will get anchor details when winning cell is NOT the cell above', () => {
      let ad = new ArrowDetail(algorithm, 3, 3);
      let anchorDetail = ad.getAnchorDetails();
      expect(anchorDetail.length).toBe(2);
      expect(anchorDetail[0]).toEqual("auto");
      expect(anchorDetail[1]).toEqual("auto");
    });

    it('will default to "auto" for anchor details when cell does not exist', () => {
      let ad = new ArrowDetail(algorithm, 17, 17);
      let anchorDetail = ad.getAnchorDetails();
      expect(anchorDetail.length).toBe(2);
      expect(anchorDetail[0]).toEqual("auto");
      expect(anchorDetail[1]).toEqual("auto");
    });
  });
});