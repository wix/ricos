import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  SortableContainer as sortableContainer,
  SortableElement as sortableElement,
  arrayMove,
} from 'react-sortable-hoc';
import classNames from 'classnames';
import { findIndex } from 'lodash';
import imageClientAPI from 'image-client-api';

import Styles from '../../../statics/styles/gallery-items-sortable.scss';
import ImageSettings from './gallery-image-settings';
import { mergeStyles, FileInput, Loader } from 'wix-rich-content-common';

import { FabIcon, UploadIcon, SelectedIcon, NotSelectedIcon } from '../../icons';

//eslint-disable-next-line no-unused-vars
const EMPTY_SMALL_PLACEHOLDER =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

const onKeyDown = (e, handler) => {
  if (e.key === 'Enter' || e.key === ' ') {
    handler();
  }
};

const SortableItem = sortableElement(props => {
  const {
    item,
    itemIdx,
    clickAction,
    addItemsButton,
    handleFileSelection,
    handleFileChange,
    isMobileSorting,
    theme,
    t,
    isMobile,
  } = props;

  const styles = mergeStyles({ styles: Styles, theme });
  const imageSize =
    isMobile && window && window.document
      ? (window.document.body.getBoundingClientRect().width - 20) / 3
      : 104;
  if (addItemsButton) {
    const uploadMediaLabel = t('GallerySettings_Upload_Media');

    return (
      <FileInput
        className={classNames(styles.itemContainer, styles.filesItem, {
          [styles.mobile]: isMobile,
        })}
        dataHook="galleryItemsSortableFileInputBottom"
        onChange={handleFileChange}
        handleFileSelection={handleFileSelection}
        multiple
        theme={theme}
        title={uploadMediaLabel}
        style={{ width: imageSize + 'px', height: imageSize + 'px' }}
      >
        <UploadIcon />
      </FileInput>
    );
  } else {
    let prefix = '';
    if (item.url.indexOf('/') < 0) {
      prefix = 'media/';
    }

    let url;
    if (item.metadata.processedByConsumer) {
      url = imageClientAPI.getScaleToFillImageURL(
        prefix + item.url,
        item.metadata.width,
        item.metadata.height,
        imageSize,
        imageSize
      );
    }

    return (
      <div
        role="gridcell"
        tabIndex="0"
        aria-selected={item.selected}
        className={classNames(styles.itemContainer, {
          [styles.itemContainerSelected]: item.selected && !isMobile,
          [styles.itemContainerSelectedMobile]: item.selected && isMobile,
          [styles.mobile]: isMobile,
          [styles.sorting]: isMobileSorting,
        })}
        data-hook="galleryItemsSortable"
        onClick={() => clickAction(itemIdx)}
        onKeyDown={e => onKeyDown(e, () => clickAction(itemIdx))}
        style={{
          width: imageSize + 'px',
          height: imageSize + 'px',
        }}
      >
        {item.selected && isMobile && !isMobileSorting && (
          <SelectedIcon className={styles.itemContainerSelected_icon} />
        )}
        {!item.selected && isMobile && !isMobileSorting && (
          <NotSelectedIcon className={styles.itemContainerNotSelected_icon} />
        )}
        {url ? (
          <img
            alt="Gallery Item Thumbnail"
            data-hook="galleryItemPreview"
            className={styles.itemImage}
            src={url}
            style={{
              width: imageSize + 'px',
              height: imageSize + 'px',
            }}
          />
        ) : (
          <Loader theme={theme} />
        )}
      </div>
    );
  }
});

const SortableList = sortableContainer(props => {
  const {
    items,
    clickAction,
    handleFileSelection,
    handleFileChange,
    isMobileSorting,
    theme,
    t,
    isMobile,
  } = props;

  const styles = mergeStyles({ styles: Styles, theme });
  return (
    <div
      role="grid"
      aria-label="Gallery Media Management"
      aria-multiselectable="true"
      className={classNames(styles.sortableContainer, { [styles.mobile]: isMobile })}
    >
      {items.map((item, itemIdx) => (
        <SortableItem
          key={`item-${itemIdx}`}
          itemIdx={itemIdx}
          index={itemIdx}
          item={item}
          clickAction={clickAction}
          isMobileSorting={isMobileSorting}
          disabled={isMobile && !isMobileSorting}
          theme={theme}
          t={t}
          isMobile={isMobile}
        />
      ))}
      {isMobileSorting ? null : (
        <SortableItem
          key={`item-upload-mock`}
          itemIdx={items.length}
          index={items.length}
          isMobile={isMobile}
          handleFileSelection={handleFileSelection}
          handleFileChange={handleFileChange}
          theme={theme}
          t={t}
          addItemsButton
          disabled
        />
      )}
    </div>
  );
});

//eslint-disable-next-line
const ItemActionsMenu = props => {
  const {
    items,
    setAllItemsValue,
    deleteSelectedItems,
    toggleImageSettings,
    handleFileSelection,
    handleFileChange,
    toggleSorting,
    isMobileSorting,
    theme,
    t,
    isMobile,
  } = props;

  const styles = mergeStyles({ styles: Styles, theme });
  const hasUnselectedItems = items.some(item => !item.selected);
  const hasSelectedItems = items.some(item => item.selected);
  const selectedItems = items.filter(item => item.selected);
  const addMediaLabel = t('GallerySettings_Add_Media');
  const finishSortingLabel = t('GallerySettings_Finish_Sorting');
  const sortItemsLabel = t('GallerySettings_Sort_Items');
  const selectAllLabel = t('GallerySettings_Select_All');
  const deselectLabel = t('GallerySettings_Deselect');
  const deleteLabel = t('GallerySettings_Delete');
  const itemSettingsLabel = t('GallerySettings_Image_Settings');

  //eslint-disable-next-line max-len
  const addItemButton = (
    <FileInput
      className={styles.filesButton}
      dataHook="galleryItemsSortableFileInputTop"
      onChange={handleFileChange}
      handleFileSelection={handleFileSelection}
      multiple
      theme={theme}
    >
      {isMobile ? <FabIcon className={styles.fab} /> : `+ ${addMediaLabel}`}
    </FileInput>
  );

  const separator = key => (
    <span className={styles.seperator} key={key}>
      ·
    </span>
  );
  const buttons = [];
  const toggleSortingLabel = isMobileSorting ? finishSortingLabel : sortItemsLabel;
  const toggleSortingButton = (
    <button
      key="toggleSortingButton"
      className={styles.topBarLink}
      data-hook="galleryItemsSortableToggleSorting"
      onClick={toggleSorting}
      aria-label={toggleSortingLabel}
      role="menuitem"
    >
      {toggleSortingLabel}
    </button>
  );
  const selectAllButton = (
    <button
      key="selectAllButton"
      className={styles.topBarLink}
      data-hook="galleryItemsSortableSelectAll"
      onClick={() => setAllItemsValue('selected', true)}
      aria-label={selectAllLabel}
      role="menuitem"
    >
      {selectAllLabel}
    </button>
  );
  const deselectAllButton = (
    <button
      key="deselectAllButton"
      className={styles.topBarLink}
      data-hook="galleryItemsSortableDeselectAll"
      onClick={() => setAllItemsValue('selected', false)}
      aria-label={deselectLabel}
      role="menuitem"
    >
      {deselectLabel}
    </button>
  );

  const deleteButton = (
    <button
      key="deleteButton"
      className={styles.topBarLink}
      data-hook="galleryItemsSortableDelete"
      onClick={() => deleteSelectedItems()}
      aria-label={deleteLabel}
      role="menuitem"
    >
      {deleteLabel}
    </button>
  );

  const itemSettingsButton = (
    <button
      key="itemSettingsButton"
      className={styles.topBarLink}
      data-hook="galleryItemsSortableItemSettings"
      onClick={() => toggleImageSettings(true)}
      aria-label={itemSettingsLabel}
      role="menuitem"
    >
      {itemSettingsLabel}
    </button>
  );
  if (isMobile && selectedItems.length === 0) {
    buttons.push(toggleSortingButton);
    buttons.push(separator('sep-0'));
  }
  if (!isMobileSorting) {
    if (hasUnselectedItems) {
      buttons.push(selectAllButton);
      buttons.push(separator('sep-1'));
    }
    if (hasSelectedItems) {
      buttons.push(deselectAllButton);
      buttons.push(separator('sep-2'));
      buttons.push(deleteButton);
      buttons.push(separator('sep-3'));
    }
    if (selectedItems.length === 1) {
      buttons.push(itemSettingsButton);
      buttons.push(separator('sep-4'));
    }
  }
  buttons.splice(buttons.length - 1, 1);

  return (
    <div role="menu" className={classNames(styles.topBar, { [styles.mobile]: isMobile })}>
      {buttons}
      {hasSelectedItems || isMobileSorting ? null : addItemButton}
    </div>
  );
};

ItemActionsMenu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  setAllItemsValue: PropTypes.func,
  deleteSelectedItems: PropTypes.func,
  toggleImageSettings: PropTypes.func.isRequired,
  handleFileSelection: PropTypes.func,
  handleFileChange: PropTypes.func,
  toggleSorting: PropTypes.func,
  isMobileSorting: PropTypes.bool,
  theme: PropTypes.object.isRequired,
  t: PropTypes.func,
  isMobile: PropTypes.bool,
};

export class SortableComponent extends Component {
  state = this.propsToState(this.props);

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(
      {
        items: arrayMove(this.state.items, oldIndex, newIndex),
      },
      () => {
        this.props.onItemsChange(this.state.items);
      }
    );
  };

  clickAction = itemIdx => {
    if (this.state.isMobileSorting) {
      return;
    }
    if (this.clickedOnce) {
      this.toggleImageSettings(true, itemIdx);
      this.clickedOnce = false;
      clearInterval(this.doubleClickTimer);
    } else {
      this.clickedOnce = true;
      this.doubleClickTimer = setTimeout(() => {
        if (this.clickedOnce) {
          this.selectItem(itemIdx);
        }
        this.clickedOnce = false;
      }, 200);
    }
  };

  selectItem = itemIdx => {
    const { items } = this.state;
    const item = items[itemIdx];
    item.selected = !item.selected;
    const selectedItems = items.filter(i => i.selected);

    this.setState({
      items,
      editedImage: selectedItems.length ? selectedItems[0] : null,
      editedImageIndex:
        selectedItems.length === 1
          ? findIndex(items, i => i.itemId === selectedItems[0].itemId)
          : -1,
    });
  };

  setAllItemsValue(field, val) {
    const { items } = this.state;
    items.map(item => {
      item[field] = val;
      return item;
    });
    this.setState({
      items,
    });
  }

  toggleImageSettings = (imageSettingsVisible, itemIdx) => {
    const { items } = this.state;
    let editedImage;
    let editedImageIndex;

    if (itemIdx >= 0) {
      items.map((item, idx) => {
        item.selected = idx === itemIdx;
        return item;
      });
      editedImage = this.state.items[itemIdx];
      editedImageIndex = itemIdx;
    } else {
      editedImage = this.state.editedImage;
      editedImageIndex = this.state.editedImageIndex;
    }

    if (imageSettingsVisible) {
      this.initialImageState = items;
    } else {
      items.forEach(i => (i.selected = false));
    }

    this.setState({
      items,
      imageSettingsVisible,
      editedImage,
      editedImageIndex,
    });
  };

  toggleSorting = () => {
    this.setState({ isMobileSorting: !this.state.isMobileSorting });
  };

  deleteSelectedItems() {
    const { items } = this.state;
    this.setState(
      {
        items: items.filter(item => !item.selected),
      },
      () => {
        this.props.onItemsChange(this.state.items);
      }
    );
  }

  propsToState(props) {
    return {
      items: props.items,
    };
  }

  componentDidMount() {
    const newState = this.propsToState(this.props);
    newState.items.forEach(i => (i.selected = false));
    this.setState(newState);
  }

  componentWillReceiveProps(props) {
    this.setState(this.propsToState(props));
  }

  onCancel = () => {
    this.props.onItemsChange(this.initialImageState);
    this.setState({ items: this.initialImageState }, () => {
      this.state.items.forEach(i => (i.selected = false));
    });
    this.toggleImageSettings(false);
  };

  saveImageSettings = () => {
    const items = this.state.items.map(item => {
      if (item.metadata && item.metadata.link) {
        const { url, rel, target, isValid } = item.metadata.link;
        item.metadata.link = url && isValid !== false ? { url, rel, target } : null;
      }
      return item;
    });
    this.props.onItemsChange(items);
    this.setState({ items }, () => {
      this.state.items.forEach(i => (i.selected = false));
    });
    this.toggleImageSettings(false);
  };

  handleFileSelection = multiple => {
    const { items, editedImage } = this.state;
    const { handleFileSelection, handleFilesAdded, deleteBlock } = this.props;
    const index = editedImage ? findIndex(items, i => editedImage.url === i.url) : undefined;
    handleFileSelection(index, multiple, handleFilesAdded, deleteBlock);
  };

  onNextImage = () => {
    const { editedImageIndex, items } = this.state;
    if (editedImageIndex >= 0) {
      const newIndex = Math.min(editedImageIndex + 1, items.length - 1);
      items[editedImageIndex].selected = false;
      items[newIndex].selected = true;
      this.setState({
        editedImage: items[newIndex],
        editedImageIndex: newIndex,
        items,
      });
    }
  };

  onPreviousImage = () => {
    const { editedImageIndex, items } = this.state;
    if (editedImageIndex >= 0) {
      const newIndex = Math.max(editedImageIndex - 1, 0);
      items[editedImageIndex].selected = false;
      items[newIndex].selected = true;
      this.setState({
        editedImage: items[newIndex],
        editedImageIndex: newIndex,
        items,
      });
    }
  };

  onUpdateImage = metadata => {
    const { editedImage } = this.state;
    Object.assign(editedImage.metadata, metadata);
    this.setState({ editedImage });
  };

  onDeleteImage = () => {
    const { editedImageIndex, items } = this.state;
    const newItems = items.filter(item => !item.selected);
    const newIndex = Math.min(editedImageIndex, newItems.length - 1);
    const newEditedImage = newItems.length !== 0 ? newItems[newIndex] : { metadata: '', title: '' };
    newEditedImage.selected = true;
    this.props.onItemsChange(newItems);
    this.setState(
      {
        editedImageIndex: newIndex,
        editedImage: newEditedImage,
        items: newItems,
      },
      () => {
        if (newItems.length === 0) {
          this.toggleImageSettings(false);
        }
      }
    );
  };

  handleFileChange = files => {
    const { editedImageIndex } = this.state;
    this.props.handleFileChange(files, editedImageIndex);
    this.props.onItemsChange(this.state.items);
  };

  render() {
    const {
      handleFileSelection: shouldHandleFileSelection,
      theme,
      t,
      relValue,
      anchorTarget,
      uiSettings,
    } = this.props;
    return (
      !!this.state.items &&
      (!this.state.imageSettingsVisible ? (
        <div>
          <ItemActionsMenu
            items={this.state.items}
            setAllItemsValue={this.setAllItemsValue.bind(this)}
            deleteSelectedItems={this.deleteSelectedItems.bind(this)}
            toggleImageSettings={() => this.toggleImageSettings(true)}
            handleFileSelection={shouldHandleFileSelection ? this.handleFileSelection : null}
            handleFileChange={this.props.handleFileChange}
            toggleSorting={this.toggleSorting}
            isMobileSorting={this.state.isMobileSorting}
            theme={theme}
            t={t}
            isMobile={this.props.isMobile}
          />
          <SortableList
            items={this.state.items}
            onSortEnd={this.onSortEnd}
            clickAction={this.clickAction}
            hideSortableGhost={false}
            axis="xy"
            helperClass="sortableHelper"
            transitionDuration={50}
            handleFileSelection={shouldHandleFileSelection ? this.handleFileSelection : null}
            handleFileChange={this.props.handleFileChange}
            isMobileSorting={this.state.isMobileSorting}
            theme={theme}
            t={t}
            isMobile={this.props.isMobile}
          />
        </div>
      ) : (
        <div>
          <ImageSettings
            theme={theme}
            image={this.state.editedImage}
            onCancel={this.onCancel}
            onSave={this.saveImageSettings}
            onNextImage={this.onNextImage}
            onPreviousImage={this.onPreviousImage}
            onDeleteImage={this.onDeleteImage}
            onUpdateImage={data => this.onUpdateImage(data)}
            handleFileSelection={shouldHandleFileSelection ? this.handleFileSelection : null}
            handleFileChange={this.handleFileChange}
            t={t}
            isMobile={this.props.isMobile}
            relValue={relValue}
            anchorTarget={anchorTarget}
            visibleLeftArrow={this.state.editedImageIndex > 0}
            visibleRightArrow={this.state.editedImageIndex < this.state.items.length - 1}
            uiSettings={uiSettings}
          />
        </div>
      ))
    );
  }
}

SortableComponent.propTypes = {
  onItemsChange: PropTypes.func.isRequired,
  addItems: PropTypes.func,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleFileChange: PropTypes.func,
  handleFileSelection: PropTypes.func,
  handleFilesAdded: PropTypes.func,
  deleteBlock: PropTypes.func,
  isMobile: PropTypes.bool,
  theme: PropTypes.object.isRequired,
  t: PropTypes.func,
  relValue: PropTypes.string,
  anchorTarget: PropTypes.string,
  uiSettings: PropTypes.object,
};
