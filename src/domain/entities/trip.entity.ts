import { Tourist } from './tourist.entity';

export interface TouristProp {
  id?: number;
  destination: string;
  startDate: Date;
  endDate: Date;
  description: string;
  isCompleted: boolean;
  tourist: Tourist;
  createdAt: Date;
  updatedAt: Date;
}

export class Trip {
  private _id: number;
  private _destination: string;
  private _startDate: Date;
  private _endDate: Date;
  private _description: string;
  private _isCompleted: boolean;
  private _tourist: Tourist;
  private _createdAt: Date;
  private _updatedAt: Date;
  constructor(props: TouristProp) {
    this._id = props.id || 0;
    this._description = props.description;
    this._destination = props.destination;
    this._startDate = props.startDate;
    this._endDate = props.endDate;
    this._isCompleted = props.isCompleted;
    this._tourist = props.tourist;
    this._createdAt = props.createdAt;
    this._updatedAt = props.updatedAt;
  }

  public getId(): number {
    return this._id;
  }

  public getDestination(): string {
    return this._destination;
  }

  public getStartDate(): Date {
    return this._startDate;
  }

  public getEndDate(): Date {
    return this._endDate;
  }

  public getDescription(): string {
    return this._description;
  }

  public getIsCompleted(): boolean {
    return this._isCompleted;
  }

  public getTourist(): Tourist {
    return this._tourist;
  }

  public getCreatedAt(): Date {
    return this._createdAt;
  }

  public getUpdatedAt(): Date {
    return this._updatedAt;
  }

  public setDestination(destination: string): void {
    this._destination = destination;
  }

  public setStartDate(startDate: Date): void {
    this._startDate = startDate;
  }

  public setEndDate(endDate: Date): void {
    this._endDate = endDate;
  }

  public setDescription(description: string): void {
    this._description = description;
  }

  public setIsCompleted(isCompleted: boolean): void {
    this._isCompleted = isCompleted;
  }

  public setTourist(tourist: Tourist): void {
    this._tourist = tourist;
  }

  public setCreatedAt(createdAt: Date): void {
    this._createdAt = createdAt;
  }

  public setUpdatedAt(updatedAt: Date): void {
    this._updatedAt = updatedAt;
  }

  public static create(props: TouristProp): Trip {
    return new Trip(props);
  }
}
