import { compose, curry, fromPairs, join, split, transpose, values, zipObj } from "ramda";
import { IKeyValue } from "../../../utilities/utilities";
import { getNodes, getRelations, IGraphNode, setNodes, setRelations } from "../../storage/storage";

/**
 * An interface representing optional depedency metadata.
 */
export interface IBaseDependencyMetadata {
  name: string;
  version: string;
};

export interface IBaseGraphNodeObject extends IGraphNode { };

export interface IBaseGraphRelationObject extends IKeyValue<string> { };

export interface IBaseGraphNodeMap extends IKeyValue<IBaseGraphNodeObject> { };

export interface IBaseGraphRelationMap extends IKeyValue<IBaseGraphRelationObject> { };

/**
 * A base class responsible for weakmap initialisation. This ensures that upstream classes are able to use preprepared
 * methods defined as properties that interface with the weakmaps.
 *
 * @class
 */
export class AbstractBaseGraph {

  /**
   * A static method that will stringify key depedency metadata into a valid node name.
   *
   * @function
   *
   * @param {Object} opts      - The function options
   * @param {String} opts.name - The depedency name
   * @param {String} opts.name - the depedency version
   *
   * @returns {String} A stringified depedency name
   */
  public static stringifyDependencyMetadata(opts: IBaseDependencyMetadata): string {
    return compose(join("@"), values)(opts);
  }

  /**
   * A static method that will stringify a depedency name into a valid node name.
   *
   * @function
   *
   * @param {String} value - The stringified depedency metadata
   *
   * @returns {Object} A parsed depedency name
   */
  public static parseDependencyMetadata(value: string): IBaseDependencyMetadata {
    return compose(zipObj(["name", "version"]) as (x: string[]) => IBaseDependencyMetadata, split(/@/))(value);
  }

  constructor() {
    this.__setNodes({});
    this.__setRelations({});
  }

  public __getNodes(): IBaseGraphNodeMap {
    return getNodes(this);
  }

  public __setNodes(value: IBaseGraphNodeMap): void {
    setNodes(this, value);
  }

  public __getRelations(): IBaseGraphRelationMap {
    return getRelations(this);
  }

  public __setRelations(value: IBaseGraphRelationMap): void {
    setRelations(this, value);
  }

}
