export type Direction = 'left' | 'right' | 'up' | 'down';

export interface Coordinates {
  x: number;
  y: number;
}

export interface GestureOptions {
  duration?: number;
  percentage?: number;
}

export interface SwipeOptions {
  direction: Direction;
  duration?: number;
  distanceLevel?: 1 | 2 | 3 | 4 | 5;
}

export interface DragAndDropOptions extends GestureOptions {
  start: Coordinates;
  end: Coordinates;
}

class GestureUtils {
  async swipe(options: SwipeOptions): Promise<void> {
    const { direction, duration = 500, distanceLevel = 3 } = options;
    const { width, height } = await this.getWindowSize();
    
    const distance = this.calculateDistance(distanceLevel);
    const { start, end } = this.calculateSwipeCoordinates(direction, distance, width, height);

    const actions = [{
      type: 'pointer',
      id: 'finger1',
      parameters: { pointerType: 'touch' },
      actions: [
        { type: 'pointerMove', duration: 0, origin: 'viewport', x: start.x, y: start.y },
        { type: 'pointerDown', button: 0 },
        { type: 'pause', duration: 100 },
        { type: 'pointerMove', duration, origin: 'viewport', x: end.x, y: end.y },
        { type: 'pointerUp', button: 0 }
      ]
    }];

    await driver.performActions(actions);
    await driver.releaseActions();
    await browser.pause(500);
  }

  async dragAndDrop(options: DragAndDropOptions): Promise<void> {
    const { start, end, duration = 500 } = options;

    const actions = [{
      type: 'pointer',
      id: 'finger1',
      parameters: { pointerType: 'touch' },
      actions: [
        { type: 'pointerMove', duration: 0, origin: 'viewport', x: start.x, y: start.y },
        { type: 'pointerDown', button: 0 },
        { type: 'pause', duration: 100 },
        { type: 'pointerMove', duration, origin: 'viewport', x: end.x, y: end.y },
        { type: 'pointerUp', button: 0 }
      ]
    }];

    await driver.performActions(actions);
    await driver.releaseActions();
  }

  // --------

  private async getWindowSize() {
    const { width, height } = await driver.getWindowRect();
    return { width, height };
  }

  private calculateDistance(distanceLevel: number): number {
    if (distanceLevel === 5) return 0.9; // 최대 스와이프 (90%)
    return 0.15 * distanceLevel;
  }

  private calculateSwipeCoordinates(
    direction: Direction,
    distance: number,
    width: number,
    height: number
  ): { start: Coordinates; end: Coordinates } {
    const center = {
      x: Math.floor(width * 0.5),
      y: Math.floor(height * 0.5)
    };

    const offset = {
      x: Math.floor(width * distance * 0.5),
      y: Math.floor(height * distance * 0.5)
    };

    const coordinates = {
      left: {
        start: { x: center.x + offset.x, y: center.y },
        end: { x: center.x - offset.x, y: center.y }
      },
      right: {
        start: { x: center.x - offset.x, y: center.y },
        end: { x: center.x + offset.x, y: center.y }
      },
      up: {
        start: { x: center.x, y: center.y + offset.y },
        end: { x: center.x, y: center.y - offset.y }
      },
      down: {
        start: { x: center.x, y: center.y - offset.y },
        end: { x: center.x, y: center.y + offset.y }
      }
    };

    return coordinates[direction];
  }
}

export const gestureUtils = new GestureUtils();
