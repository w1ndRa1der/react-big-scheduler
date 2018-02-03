import moment from 'moment'
import config from './config'
import behaviors from './behaviors'
import {ViewTypes, DATE_FORMAT, DATETIME_FORMAT} from './index'

export default class SchedulerData {
    constructor(date=moment().format(DATE_FORMAT), viewType = ViewTypes.Week,
                showAgenda = false, isEventPerspective = false,
                newConfig = undefined, newBehaviors=undefined) {
        this.resources = [];
        this.events = [];
        this.eventGroups = [];
        this.eventGroupsAutoGenerated = true;
        this.viewType = viewType;
        this.showAgenda = showAgenda;
        this.isEventPerspective = isEventPerspective;
        this.resizing = false;
        this.scrollToToday = false;
        this._resolveDate(0, date);
        this.config = newConfig == undefined ? config : {...config, ...newConfig};
        this.behaviors = newBehaviors == undefined ? behaviors : {...behaviors, ...newBehaviors};
        this._createHeaders();
        this._createRenderData();
    }

    setResources(resources) {
        this._validateResource(resources);
        this.resources = Array.from(new Set(resources));
        this._createRenderData();
        this.setScrollToToday(true);
    }

    setEventGroupsAutoGenerated(autoGenerated){
        this.eventGroupsAutoGenerated = autoGenerated;
    }

    //optional
    setEventGroups(eventGroups) {
        this._validateEventGroups(eventGroups);
        this.eventGroups = Array.from(new Set(eventGroups));
        this.eventGroupsAutoGenerated = false;
        this._createRenderData();
        this.setScrollToToday(true);
    }

    addResource(resource){
        let existedResources = this.resources.filter(x => x.id === resource.id);
        if(existedResources.length === 0){
            this.resources.push(resource);
            this._createRenderData();
        }
    }

    addEventGroup(eventGroup){
        let existedEventGroups = this.eventGroups.filter(x => x.id === eventGroup.id);
        if(existedEventGroups.length === 0){
            this.eventGroups.push(eventGroup);
            this._createRenderData();
        }
    }

    removeEventGroupById(eventGroupId){
        let index = -1;
        this.eventGroups.forEach((item, idx) => {
            if(item.id === eventGroupId)
                index = idx;
        })
        if(index !== -1)
            this.eventGroups.splice(index, 1);
    }

    containsEventGroupId(eventGroupId){
        let index = -1;
        this.eventGroups.forEach((item, idx) => {
            if(item.id === eventGroupId)
                index = idx;
        })
        return index !== -1;
    }

    setEvents(events) {
        this._validateEvents(events);
        this.events = events;
        if(this.eventGroupsAutoGenerated)
            this._generateEventGroups();
        this._createRenderData();
        this.setScrollToToday(true);
    }

    setScrollToToday(scrollToToday){
        if(this.config.scrollToTodayEnabled)
            this.scrollToToday = scrollToToday;
    }

    getScrollToToday(){
        if(this.config.scrollToTodayEnabled)
            return this.scrollToToday;
        return false;
    }

    prev() {
        this._resolveDate(-1);
        this.events = [];
        this._createHeaders();
        this._createRenderData();
    }

    next() {
        this._resolveDate(1);
        this.events = [];
        this._createHeaders();
        this._createRenderData();
    }

    setDate(date=moment().format(DATE_FORMAT)){
        this._resolveDate(0, date);
        this.events = [];
        this._createHeaders();
        this._createRenderData();
    }

    setViewType(viewType = ViewTypes.Week, showAgenda = false, isEventPerspective = false) {
        this.showAgenda = showAgenda;
        this.isEventPerspective = isEventPerspective;

        if(this.viewType !== viewType) {
            let date = this.startDate;

            if(this.viewType < viewType){
                if(viewType === ViewTypes.Week) {
                    this.startDate = moment(date).startOf('week').format(DATE_FORMAT);
                    this.endDate = moment(this.startDate).endOf('week').format(DATE_FORMAT);
                }
                else if(viewType === ViewTypes.Month){
                    this.startDate = moment(date).startOf('month').format(DATE_FORMAT);
                    this.endDate = moment(this.startDate).endOf('month').format(DATE_FORMAT);
                }
                else if(viewType === ViewTypes.Quarter){
                    this.startDate = moment(date).startOf('quarter').format(DATE_FORMAT);
                    this.endDate = moment(this.startDate).endOf('quarter').format(DATE_FORMAT);
                }
                else if(viewType === ViewTypes.Year) {
                    this.startDate = moment(date).startOf('year').format(DATE_FORMAT);
                    this.endDate = moment(this.startDate).endOf('year').format(DATE_FORMAT);
                }
            }
            else{
                let start = moment(this.startDate);
                let end = moment(this.endDate).add(1, 'days');

                if(this.selectDate !== undefined) {
                    let selectDate = moment(this.selectDate);
                    if(selectDate >= start && selectDate < end) {
                        date = this.selectDate;
                    }
                }

                let now = moment();
                if(now >= start && now < end) {
                    date = now.format(DATE_FORMAT);
                }

                if(viewType === ViewTypes.Day) {
                    this.startDate = date;
                    this.endDate = this.startDate;
                }
                else if(viewType === ViewTypes.Week) {
                    this.startDate = moment(date).startOf('week').format(DATE_FORMAT);
                    this.endDate = moment(this.startDate).endOf('week').format(DATE_FORMAT);
                }
                else if(viewType === ViewTypes.Month){
                    this.startDate = moment(date).startOf('month').format(DATE_FORMAT);
                    this.endDate = moment(this.startDate).endOf('month').format(DATE_FORMAT);
                }
                else if(viewType === ViewTypes.Quarter){
                    this.startDate = moment(date).startOf('quarter').format(DATE_FORMAT);
                    this.endDate = moment(this.startDate).endOf('quarter').format(DATE_FORMAT);
                }
            }

            this.viewType = viewType;
            this.events = [];
            this._createHeaders();
            this._createRenderData();
            this.setScrollToToday(true);
        }
    }

    setSchedulerMaxHeight(newSchedulerMaxHeight){
        this.config.schedulerMaxHeight = newSchedulerMaxHeight;
    }

    getSlots(){
        return this.isEventPerspective ? this.eventGroups : this.resources;
    }

    getSlotById(slotId){
        let slots = this.getSlots();
        let slot = undefined;
        slots.forEach((item) => {
            if(item.id === slotId)
                slot = item;
        })
        return slot;
    }

    getResourceById(resourceId){
        let resource = undefined;
        this.resources.forEach((item) => {
            if(item.id === resourceId)
                resource = item;
        })
        return resource;
    }

    getTableHeaderHeight() {
        return this.config.tableHeaderHeight;
    }

    getResourceTableWidth() {
        if(this.showAgenda) return this.config.agendaResourceTableWidth;

        return this.viewType === ViewTypes.Week ? this.config.weekResourceTableWidth : (
            this.viewType === ViewTypes.Day ? this.config.dayResourceTableWidth : (
                this.viewType === ViewTypes.Month ? this.config.monthResourceTableWidth : (
                    this.viewType === ViewTypes.Year ? this.config.yearResourceTableWidth :
                        this.config.quarterResourceTableWidth
                )
            )
        );
    }

    getContentCellWidth(){
        return this.viewType === ViewTypes.Week ? this.config.weekCellWidth : (
            this.viewType === ViewTypes.Day ? this.config.dayCellWidth : (
                this.viewType === ViewTypes.Month ? this.config.monthCellWidth : (
                    this.viewType === ViewTypes.Year ? this.config.yearCellWidth :
                        this.config.quarterCellWidth
                )
            )
        );
    }

    getCellMaxEvents(){
        return this.viewType === ViewTypes.Week ? this.config.weekMaxEvents : (
            this.viewType === ViewTypes.Day ? this.config.dayMaxEvents : (
                this.viewType === ViewTypes.Month ? this.config.monthMaxEvents : (
                    this.viewType === ViewTypes.Year ? this.config.yearMaxEvents :
                        this.config.quarterMaxEvents
                )
            )
        );
    }

    getContentTableWidth(){
        return this.headers.length * (this.getContentCellWidth());
    }

    getDateLabel(){
        let start = moment(this.startDate);
        let end = moment(this.endDate);
        let dateLabel = start.format('YYYY MMM Do');

        if(this.viewType === ViewTypes.Week) {
            dateLabel = `${start.format('YYYY MMM Do')}-${end.format('Do')}`;
            if(start.month() !== end.month())
                dateLabel = `${start.format('YYYY MMM Do')}-${end.format('MMM Do')}`;
            if(start.year() !== end.year())
                dateLabel = `${start.format('YYYY MMM Do')}-${end.format('YYYY MMM Do')}`;
        }
        else if(this.viewType === ViewTypes.Month){
            dateLabel = start.format('YYYY MMM');
        }
        else if(this.viewType === ViewTypes.Quarter){
            dateLabel = `${start.format('YYYY MMM Do')}-${end.format('MMM Do')}`;
        }
        else if(this.viewType === ViewTypes.Year) {
            dateLabel = start.format('YYYY');
        }

        return dateLabel;
    }

    addEvent(newEvent){
        this._attachEvent(newEvent);
        if(this.eventGroupsAutoGenerated)
            this._generateEventGroups();
        this._createRenderData();
    }

    updateEventStart(event, newStart) {
        this._detachEvent(event);
        event.start = newStart;
        this._attachEvent(event);
        this._createRenderData();
    }

    updateEventEnd(event, newEnd) {
        event.end = newEnd;
        this._createRenderData();
    }

    moveEvent(event, newSlotId, newSlotName, newStart, newEnd){
        this._detachEvent(event);
        if(this.isEventPerspective) {
            event.groupId = newSlotId;
            event.groupName = newSlotName;
        }
        else
            event.resourceId = newSlotId;
        event.end = newEnd;
        event.start = newStart;
        this._attachEvent(event);
        this._createRenderData();
    }

    _detachEvent(event) {
        let index = this.events.indexOf(event);
        if(index !== -1)
            this.events.splice(index, 1);
    }

    _attachEvent(event) {
        let pos = 0;
        let eventStart = moment(event.start);
        this.events.forEach((item, index) => {
            let start = moment(item.start);
            if(eventStart >= start)
                pos = index + 1;
        });
        this.events.splice(pos, 0, event);
    }

    _resolveDate(num, date = undefined){
        if(date != undefined)
            this.selectDate = moment(date).format(DATE_FORMAT);

        if(this.viewType === ViewTypes.Week) {
            this.startDate = date != undefined ? moment(date).startOf('week').format(DATE_FORMAT)
                : moment(this.startDate).add(num, 'weeks').format(DATE_FORMAT);
            this.endDate = moment(this.startDate).endOf('week').format(DATE_FORMAT);
        }
        else if(this.viewType === ViewTypes.Day) {
            this.startDate = date != undefined ? this.selectDate
                : moment(this.startDate).add(num, 'days').format(DATE_FORMAT);
            this.endDate = this.startDate;
        }
        else if(this.viewType === ViewTypes.Month){
            this.startDate = date != undefined ? moment(date).startOf('month').format(DATE_FORMAT)
                : moment(this.startDate).add(num, 'months').format(DATE_FORMAT);
            this.endDate = moment(this.startDate).endOf('month').format(DATE_FORMAT);
        }
        else if(this.viewType === ViewTypes.Quarter){
            this.startDate = date != undefined ? moment(date).startOf('quarter').format(DATE_FORMAT)
                : moment(this.startDate).add(num, 'quarters').format(DATE_FORMAT);
            this.endDate = moment(this.startDate).endOf('quarter').format(DATE_FORMAT);
        }
        else if(this.viewType === ViewTypes.Year) {
            this.startDate = date != undefined ? moment(date).startOf('year').format(DATE_FORMAT)
                : moment(this.startDate).add(num, 'years').format(DATE_FORMAT);
            this.endDate = moment(this.startDate).endOf('year').format(DATE_FORMAT);
        }
    }

    _createHeaders() {
        let headers = [],
            start = moment(this.startDate),
            end = moment(this.endDate),
            header = start;

        if(this.showAgenda){
            headers.push({time: header.format(DATETIME_FORMAT), nonWorkingTime: false});
        }
        else {
            if (this.viewType === ViewTypes.Day) {
                start = start.add(this.config.dayStartFrom, 'hours');
                end = end.add(this.config.dayStopTo, 'hours');
                header = start;

                while (header >= start && header <= end) {
                    let time = header.format(DATETIME_FORMAT);
                    let nonWorkingTime = this.behaviors.isNonWorkingTimeFunc(this, time);
                    headers.push({ time: time, nonWorkingTime: nonWorkingTime });

                    header = header.add(30, 'minutes');
                    time = header.format(DATETIME_FORMAT);
                    nonWorkingTime = this.behaviors.isNonWorkingTimeFunc(this, time);
                    headers.push({ time: time, nonWorkingTime: nonWorkingTime });

                    header = header.add(30, 'minutes');
                }
            }
            else {
                while (header >= start && header <= end) {
                    let time = header.format(DATETIME_FORMAT);
                    let nonWorkingTime = this.behaviors.isNonWorkingTimeFunc(this, time);
                    headers.push({ time: time, nonWorkingTime: nonWorkingTime });

                    header = header.add(1, 'days');
                }
            }
        }

        this.headers = headers;
    }

    _createInitHeaderEvents(header) {
        let start = moment(header.time),
            startValue = start.format(DATETIME_FORMAT);
        let endValue = this.showAgenda ? (this.viewType === ViewTypes.Week ? start.add(1, 'weeks').format(DATETIME_FORMAT) : (
            this.viewType === ViewTypes.Day ? start.add(1, 'days').format(DATETIME_FORMAT) : (
                this.viewType === ViewTypes.Month ? start.add(1, 'months').format(DATETIME_FORMAT) : (
                    this.viewType === ViewTypes.Year ? start.add(1, 'years').format(DATETIME_FORMAT) :
                        start.add(1, 'quarters').format(DATETIME_FORMAT)
                )
            )
        )) : (this.viewType === ViewTypes.Day ?  start.add(30, 'minutes').format(DATETIME_FORMAT)
            : start.add(1, 'days').format(DATETIME_FORMAT));
        return {
            time:  header.time,
            nonWorkingTime: header.nonWorkingTime,
            start: startValue,
            end:   endValue,
            count: 0,
            addMore: 0,
            addMoreIndex: 0,
            events: [,,,],
        };
    }

    _createHeaderEvent(render, span, eventItem) {
        return {
            render: render,
            span: span,
            eventItem: eventItem
        };
    }

    _getEventSlotId(event){
        return this.isEventPerspective ? this._getEventGroupId(event) : event.resourceId;
    }

    _getEventGroupId(event){
        return !!event.groupId ? event.groupId.toString() : event.id.toString();
    }

    _getEventGroupName(event){
        return !!event.groupName ? event.groupName : event.title;
    }

    _generateEventGroups(){
        let eventGroups = [];
        let set = new Set();
        this.events.forEach((item) => {
            let groupId = this._getEventGroupId(item);
            let groupName = this._getEventGroupName(item);

            if(!set.has(groupId)){
                eventGroups.push({
                    id: groupId,
                    name: groupName,
                    state: item,
                });
                set.add(groupId);
            }
        })
        this.eventGroups = eventGroups;
    }

    _createInitRenderData(isEventPerspective, eventGroups, resources, headers) {
        return isEventPerspective ? eventGroups.map((eventGroup) => {
            let headerEvents = headers.map((header) => {
                return this._createInitHeaderEvents(header);
            });

            return {
                slotId: eventGroup.id,
                slotName: eventGroup.name,
                rowHeight: 0,
                headerItems: headerEvents
            };
        }) : resources.map((resource) => {
            let headerEvents = headers.map((header) => {
                return this._createInitHeaderEvents(header);
            });

            return {
                slotId: resource.id,
                slotName: resource.name,
                rowHeight: 0,
                headerItems: headerEvents
            };
        });
    }

    _getSpan(startTime, endTime, startDate, endDate){
        if(this.showAgenda) return 1;

        let start = this.viewType === ViewTypes.Day ?
                (moment(startTime).startOf('hour').add(30, 'minutes') <= moment(startTime) ? moment(startTime).startOf('hour').add(30, 'minutes') : moment(startTime).startOf('hour'))
                : moment(startTime).startOf('day'),
            end = moment(endTime),
            spanStart = moment(startDate),
            spanEnd = moment(endDate),
            time = start,
            span = 0;

        while(time >= start && time < end) {
            if(time >= spanStart && time <= spanEnd) {
                span++;
            }

            time = this.viewType === ViewTypes.Day ? time.add(30, 'minutes') : time.add(1, 'days');
        }

        return span;
    }

    _validateResource(resources){
        if(Object.prototype.toString.call(resources) !== "[object Array]") {
            throw new Error('Resources should be Array object');
        }

        resources.forEach((item, index) => {
            if(item == undefined) {
                console.error(`Resource undefined: ${index}`);
                throw new Error(`Resource undefined: ${index}`);
            }
            if(item.id == undefined || item.name == undefined)
            {
                console.error('Resource property missed', index, item);
                throw new Error(`Resource property undefined: ${index}`);
            }
        });
    }

    _validateEventGroups(eventGroups){
        if(Object.prototype.toString.call(eventGroups) !== "[object Array]") {
            throw new Error('Event groups should be Array object');
        }

        eventGroups.forEach((item, index) => {
            if(item == undefined) {
                console.error(`Event group undefined: ${index}`);
                throw new Error(`Event group undefined: ${index}`);
            }
            if(item.id == undefined || item.name == undefined)
            {
                console.error('Event group property missed', index, item);
                throw new Error(`Event group property undefined: ${index}`);
            }
        });
    }

    _validateEvents(events){
        if(Object.prototype.toString.call(events) !== "[object Array]") {
            throw new Error('Events should be Array object');
        }

        events.forEach((e, index) => {
            if(e == undefined) {
                console.error(`Event undefined: ${index}`);
                throw new Error(`Event undefined: ${index}`);
            }
            if(e.id == undefined || e.resourceId == undefined || e.title == undefined || e.start == undefined || e.end == undefined)
            {
                console.error('Event property missed', index, e);
                throw new Error(`Event property undefined: ${index}`);
            }
        });
    }

    _compare(event1, event2){
        let start1 = moment(event1.start), start2 = moment(event2.start);
        if(start1 !== start2) return start1 < start2 ? -1 : 1;

        let end1 = moment(event1.end), end2 = moment(event2.end);
        if(end1 !== end2) return end1 < end2 ? -1 : 1;

        return event1.id < event2.id ? -1 : 1;
    }

    _createRenderData() {
        let initRenderData = this._createInitRenderData(this.isEventPerspective, this.eventGroups, this.resources, this.headers);
        //this.events.sort(this._compare);

        this.events.forEach((item) => {
            let resourceEventsList = initRenderData.filter(x => x.slotId === this._getEventSlotId(item));
            if(resourceEventsList.length > 0) {
                let resourceEvents = resourceEventsList[0];
                let span = this._getSpan(item.start, item.end, this.headers[0].time, this.headers[this.headers.length - 1].time);
                let eventStart = moment(item.start), eventEnd = moment(item.end);
                let pos = -1;

                resourceEvents.headerItems.forEach((header, index) => {
                    let headerStart = moment(header.start), headerEnd = moment(header.end);
                    if(headerEnd > eventStart && headerStart < eventEnd) {
                        header.count = header.count + 1;

                        if(pos === -1)
                        {
                            let tmp = 0;
                            while (header.events[tmp] !== undefined)
                                tmp++;

                            pos = tmp;
                        }
                        let render = headerStart <= eventStart || index === 0;
                        header.events[pos] = this._createHeaderEvent(render, span, item);
                    }
                });
            }
        });

        initRenderData.forEach((resourceEvents) => {
            let maxRowsCount = 0;
            let hasSummary = false;
            resourceEvents.headerItems.forEach((headerItem) => {
                maxRowsCount = headerItem.count > maxRowsCount ? headerItem.count : maxRowsCount;

                let renderItemsCount = 0, addMoreIndex = 0, index = 0;
                while (index < this.getCellMaxEvents() - 1) {
                    if(headerItem.events[index] !== undefined) {
                        renderItemsCount++;
                        addMoreIndex = index + 1;
                    }

                    index++;
                }

                if(headerItem.events[index] !== undefined) {
                    if(renderItemsCount + 1 < headerItem.count) {
                        headerItem.addMore = headerItem.count - renderItemsCount;
                        headerItem.addMoreIndex = addMoreIndex;
                    }
                }
                else {
                    if(renderItemsCount < headerItem.count) {
                        headerItem.addMore = headerItem.count - renderItemsCount;
                        headerItem.addMoreIndex = addMoreIndex;
                    }
                }

                if(this.behaviors.getSummaryFunc !== undefined){
                    let events = [];
                    headerItem.events.forEach((e) => {
                        if(!!e && !!e.eventItem)
                            events.push(e.eventItem);
                    });

                    headerItem.summary = this.behaviors.getSummaryFunc(this, events, resourceEvents.slotId, resourceEvents.slotName, headerItem.start, headerItem.end);
                    if(!!headerItem.summary && headerItem.summary.text != undefined)
                        hasSummary = true;
                }
            });

            resourceEvents.hasSummary = hasSummary;
            let rowsCount = maxRowsCount > this.getCellMaxEvents() ? this.getCellMaxEvents() : maxRowsCount;
            resourceEvents.rowHeight = rowsCount === 0 ? this.config.eventItemLineHeight + 2 : rowsCount * this.config.eventItemLineHeight + (this.config.creatable && this.config.checkConflict === false ? 20 : 2);
            if(hasSummary)
                resourceEvents.rowHeight = resourceEvents.rowHeight + this.config.eventItemLineHeight;
        });

        this.renderData = initRenderData;
    }

    _startResizing() {
        this.resizing = true;
    }

    _stopResizing() {
        this.resizing = false;
    }

    _isResizing() {
        return this.resizing;
    }
}


