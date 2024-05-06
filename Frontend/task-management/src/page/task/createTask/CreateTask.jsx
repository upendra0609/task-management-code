import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button, Grid, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import styles from "./CreateTask.module.css";
import { useDispatch } from "react-redux";
import { createTask } from "../../../store/taskSlice";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  outline: "none",
  boxShadow: 24,
  p: 4,
};

const CreateTask = ({ handleClose, open }) => {
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    description: "",
    tags: [],
    deadline: new Date(),
  });

  const [selectedTag, setSelectedTag] = useState([]);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTagChange = (e, value) => {
    setSelectedTag(value);
    setFormData({ ...formData, tags: value });
  };

  const handleDeadLineChange = (date) => {
    setFormData({ ...formData, deadline: date });
  };

  const formatDate = (input) => {
    let {
      $y: year,
      $M: month,
      $D: day,
      $H: hour,
      $m: minute,
      $s: second,
      $ms: millisecond,
    } = input;
    const date = new Date(year, month, day, hour, minute, second, millisecond);
    const formatedDate = date.toISOString();
    return formatedDate;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formData.deadline = formatDate(formData.deadline);
    console.log("Form Data ", formData);
    dispatch(createTask(formData));
    handleClose();
  };

  return (
    <div className={""}>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2} alignItems={"center"}>
                <Grid item xs={12}>
                  <TextField
                    label="Title"
                    fullWidth
                    name="title"
                    value={formData.title}
                    onChange={(e) => handleChange(e)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Image"
                    fullWidth
                    name="image"
                    value={formData.image}
                    onChange={(e) => handleChange(e)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Description"
                    fullWidth
                    multiline
                    rows={4}
                    name="description"
                    value={formData.description}
                    onChange={(e) => handleChange(e)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Autocomplete
                    multiple
                    id="multiple limit tags"
                    options={tags}
                    // disableCloseOnSelect
                    onChange={handleTagChange}
                    getOptionLabel={(option) => option}
                    // renderOption={(props, option, { selected }) => (
                    //   <li {...props}>
                    //     <Checkbox
                    //       icon={icon}
                    //       checkedIcon={checkedIcon}
                    //       style={{ marginRight: 8 }}
                    //       checked={selected}
                    //     />
                    //     {option.title}
                    //   </li>
                    // )}
                    // style={{ width: 400 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Tags"
                        placeholder="Technology used"
                        name="tags"
                        fullWidth
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      className="w-full"
                      label="Deadline"
                      renderInput={(params) => <TextField {...params} />}
                      onChange={handleDeadLineChange}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    sx={{ padding: "0.9rem" }}
                    className={styles.customButton}
                    type="submit"
                  >
                    Create Task
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default CreateTask;

const tags = [
  "React",
  "Angular",
  "Java",
  "Spring Boot",
  "Node js",
  "Pythons",
  "Docker",
  "Jenkins",
  "AWS",
];
